import { ETHEREUM_SEPOLIA_RPC_URL, UNICHAIN_SEPOLIA_RPC_URL } from "../../data/config"
import { getBaseFee } from "../modules/ethers/ethers"
import { logger } from "../utils/logger"

export const getFeeData = async () => {
  const feeEthereum = await getBaseFee(ETHEREUM_SEPOLIA_RPC_URL)
  const feeUnichain = await getBaseFee(UNICHAIN_SEPOLIA_RPC_URL)

  logger.info(`Base Fee Ethereum Sepolia: ${feeEthereum} Gwei`)
  logger.info(`Base Fee Unichain Sepolia: ${feeUnichain} Gwei`)
}
