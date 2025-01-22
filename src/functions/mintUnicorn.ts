import { SLEEP_MINT } from "../../data/config"
import DatabaseConnection from "../modules/db"
import { claimNFT } from "../modules/ethers/ethers"
import { sleepInRange } from "../utils/basic"
import { logger } from "../utils/logger"

export const mintUnicorn = async () => {
  const db = new DatabaseConnection()
  const wallets = await db.getAllWallets()
  await db.close()

  for (const wallet of wallets) {
    if (Number(wallet.balance_unichain_sepolia) == 0) {
      logger.warn(`Zero balance (${wallet.address})`)
      continue
    }

    try {
      const tx = await claimNFT(wallet.private_key, "0x99F4146B950Ec5B8C6Bc1Aa6f6C9b14b6ADc6256")
      logger.info(`https://sepolia.uniscan.xyz/tx/${tx?.hash} (${wallet.address})`)
    } catch (err) {
      logger.error(err)
    }

    await sleepInRange(SLEEP_MINT[0], SLEEP_MINT[1])
  }
}
