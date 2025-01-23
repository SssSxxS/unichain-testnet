import { BRIDGE_AMOUNT_RANGE, SLEEP_BRIDGE } from "../../data/config"
import DatabaseConnection from "../modules/db"
import { callBridgeEthTo } from "../modules/ethers/ethers"
import { getRandomNumToFixed, sleepInRange } from "../utils/basic"
import { logger } from "../utils/logger"

export const bridgeSuper = async () => {
  const db = new DatabaseConnection()
  const wallets = await db.getAllWallets()
  await db.close()

  const extraData = "0x7375706572627269646765" // Hex to UTF-8 => superbridge

  for (const wallet of wallets) {
    try {
      const amountInEth = getRandomNumToFixed(BRIDGE_AMOUNT_RANGE[0], BRIDGE_AMOUNT_RANGE[1], 4)
      if (Number(wallet.balance_ethereum_sepolia) < Number(amountInEth)) {
        logger.warn(
          `Insufficient balance (${wallet.address},balance: ${wallet.balance_ethereum_sepolia}, required: ${amountInEth})`
        )
        continue
      }

      const tx = await callBridgeEthTo(wallet.private_key, amountInEth, extraData)
      logger.info(`https://sepolia.etherscan.io/tx/${tx.hash} (${wallet.address}, ${amountInEth})`)
      await sleepInRange(SLEEP_BRIDGE[0], SLEEP_BRIDGE[1])
    } catch (err) {
      logger.error(err)
    }
  }
}
