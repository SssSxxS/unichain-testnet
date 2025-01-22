import DatabaseConnection from "../modules/db"
import { getAddressFromPrivateKey } from "../modules/ethers/ethers"
import { getPrivateKeys } from "../utils/getData"
import { logger } from "../utils/logger"

export const recreateDatabase = async () => {
  try {
    const privateKeys = getPrivateKeys()
    logger.info(`Found ${privateKeys.length} private keys`)

    const db = new DatabaseConnection()
    await db.recreateTable()
    await db.beginTransaction()

    for (const privateKey of privateKeys) {
      try {
        const address = getAddressFromPrivateKey(privateKey)
        await db.insertWallet(privateKey, address)
      } catch (err) {
        logger.error(err)
      }
    }

    await db.commitTransaction()
    await db.close()
  } catch (err) {
    logger.error(err)
  }
}
