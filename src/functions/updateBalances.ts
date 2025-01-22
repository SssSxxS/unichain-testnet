import { ETHEREUM_SEPOLIA_RPC_URL, UNICHAIN_SEPOLIA_RPC_URL } from "../../data/config"
import DatabaseConnection from "../modules/db"
import { getEthBalance } from "../modules/ethers/ethers"

export const updateBalances = async () => {
  const db = new DatabaseConnection()
  const wallets = await db.getAllWallets()

  await db.beginTransaction()
  for (const wallet of wallets) {
    const balance_ethereum_sepolia = await getEthBalance(ETHEREUM_SEPOLIA_RPC_URL, wallet.address)
    const balance_unichain_sepolia = await getEthBalance(UNICHAIN_SEPOLIA_RPC_URL, wallet.address)
    await db.updateBalance(wallet.address, balance_ethereum_sepolia, balance_unichain_sepolia)
  }
  await db.commitTransaction()

  await db.close()
}
