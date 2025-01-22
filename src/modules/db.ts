import sqlite3 from "sqlite3"
import { logger } from "../utils/logger"

const DB_PATH = "./data/database.db"

type Wallet = {
  id: number
  private_key: string
  address: string
  balance_ethereum_sepolia: string
  balance_unichain_sepolia: string
}

export default class DatabaseConnection {
  private db: sqlite3.Database

  constructor() {
    this.db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) logger.error(err)
      else logger.debug("Connected to the database successfully")
    })
  }

  public recreateTable() {
    return new Promise<void>((resolve, reject) => {
      const dropTableQuery = "DROP TABLE IF EXISTS wallets"
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS wallets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            private_key TEXT UNIQUE NOT NULL,
            address TEXT UNIQUE NOT NULL,
            balance_ethereum_sepolia TEXT DEFAULT '0',
            balance_unichain_sepolia TEXT DEFAULT '0'
        )`

      this.db.serialize(() => {
        this.db.run(dropTableQuery, (err) => {
          if (err) reject(err)
          else logger.debug("Table wallets dropped successfully")
        })
        this.db.run(createTableQuery, (err) => {
          if (err) reject(err)
          else logger.debug("Table wallets created successfully")
        })
        resolve()
      })
    })
  }

  public beginTransaction() {
    return new Promise<void>((resolve, reject) => {
      this.db.run("BEGIN TRANSACTION", (err) => {
        if (err) reject(err)
        else {
          logger.debug("Transaction started successfully")
          resolve()
        }
      })
    })
  }

  public commitTransaction() {
    return new Promise<void>((resolve, reject) => {
      this.db.run("COMMIT", (err) => {
        if (err) {
          this.db.run("ROLLBACK", (rollbackErr) => {
            if (rollbackErr) reject(rollbackErr)
            else logger.debug("Transaction rolled back successfully")
          })
          reject(err)
        } else {
          logger.debug("Transaction committed successfully")
          resolve()
        }
      })
    })
  }

  public insertWallet(private_key: string, address: string) {
    return new Promise<void>((resolve, reject) => {
      this.db.run("INSERT INTO wallets (private_key, address) VALUES (?, ?)", [private_key, address], (err) => {
        if (err) {
          logger.error(`Failed to insert wallet (${private_key.substring(0, 5)}..., ${address})`)
          reject(err)
        } else {
          logger.info(`Wallet inserted successfully (${private_key.substring(0, 5)}..., ${address})`)
          resolve()
        }
      })
    })
  }

  public updateBalance(address: string, balance_ethereum_sepolia: string, balance_unichain_sepolia: string) {
    return new Promise<void>((resolve, reject) => {
      const updateBalanceQuery = `
        UPDATE wallets 
        SET balance_ethereum_sepolia = ?, balance_unichain_sepolia = ? 
        WHERE address = ?`

      this.db.run(updateBalanceQuery, [balance_ethereum_sepolia, balance_unichain_sepolia, address], (err) => {
        if (err) {
          logger.error(`Failed to update balance (${address})`)
          reject(err)
        } else {
          logger.info(`Balance updated successfully (${address})`)
          resolve()
        }
      })
    })
  }

  public getAllWallets() {
    return new Promise<Wallet[]>((resolve, reject) => {
      this.db.all("SELECT * FROM wallets", (err, rows: Wallet[]) => {
        if (err) reject(err)
        else {
          logger.debug("Wallets fetched successfully")
          resolve(rows)
        }
      })
    })
  }

  public close() {
    return new Promise<void>((resolve, reject) => {
      this.db.close((err) => {
        if (err) reject(err)
        else {
          logger.debug("Database connection closed")
          resolve()
        }
      })
    })
  }
}
