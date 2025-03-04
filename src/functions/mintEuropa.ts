import { SLEEP_MINT } from "../../data/config"
import DatabaseConnection from "../modules/db"
import { claimNFT } from "../modules/ethers/ethers"
import { sleepInRange } from "../utils/basic"
import { logger } from "../utils/logger"

export const mintEuropa = async () => {
  const db = new DatabaseConnection()
  const wallets = await db.getAllWallets()
  await db.close()

  for (const wallet of wallets) {
    try {
      if (Number(wallet.balance_unichain_sepolia) == 0) {
        logger.warn(`Zero balance (${wallet.address})`)
        continue
      }

      const tx = await claimNFT(wallet.private_key, "0x2188DA4AE1CAaFCf2fBFb3ef34227F3FFdc46AB6")
      logger.info(`https://sepolia.uniscan.xyz/tx/${tx?.hash} (${wallet.address})`)
      await sleepInRange(SLEEP_MINT[0], SLEEP_MINT[1])
    } catch (err) {
      logger.error(err)
    }
  }
}
