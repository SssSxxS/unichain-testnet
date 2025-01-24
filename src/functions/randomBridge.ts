import { BRIDGE_AMOUNT_RANGE, SLEEP_BRIDGE } from "../../data/config"
import DatabaseConnection from "../modules/db"
import { callBridgeEthTo } from "../modules/ethers/ethers"
import { getRandomNumFloor, getRandomNumToFixed, sleepInRange } from "../utils/basic"
import { logger } from "../utils/logger"

export const randomBridge = async () => {
  const db = new DatabaseConnection()
  const wallets = await db.getAllWallets()
  await db.close()

  for (const wallet of wallets) {
    try {
      const amountInEth = getRandomNumToFixed(BRIDGE_AMOUNT_RANGE[0], BRIDGE_AMOUNT_RANGE[1], 4)
      if (Number(wallet.balance_ethereum_sepolia) < Number(amountInEth)) {
        logger.warn(
          `Insufficient balance (${wallet.address},balance: ${wallet.balance_ethereum_sepolia}, required: ${amountInEth})`
        )
        continue
      }

      let tx = undefined
      switch (getRandomNumFloor(1, 2)) {
        case 1:
          tx = await callBridgeEthTo(wallet.private_key, amountInEth, "0x7375706572627269646765")
          break
        case 2:
          tx = await callBridgeEthTo(wallet.private_key, amountInEth, "0x6272696467670a")
          break
        default:
          break
      }
      logger.info(`https://sepolia.etherscan.io/tx/${tx.hash} (${wallet.address}, ${amountInEth})`)

      await sleepInRange(SLEEP_BRIDGE[0], SLEEP_BRIDGE[1])
    } catch (err) {
      logger.error(err)
    }
  }
}
