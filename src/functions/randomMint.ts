import { SLEEP_MINT } from "../../data/config"
import DatabaseConnection from "../modules/db"
import { claimNFT } from "../modules/ethers/ethers"
import { shuffleArray, sleepInRange } from "../utils/basic"
import { logger } from "../utils/logger"

export const randomMint = async () => {
  const db = new DatabaseConnection()
  const wallets = await db.getAllWallets()
  await db.close()

  for (const wallet of wallets) {
    try {
      if (Number(wallet.balance_unichain_sepolia) == 0) {
        logger.warn(`Zero balance (${wallet.address})`)
        continue
      }

      const contracts = [
        "0x99F4146B950Ec5B8C6Bc1Aa6f6C9b14b6ADc6256", // Unicorn
        "0x2188DA4AE1CAaFCf2fBFb3ef34227F3FFdc46AB6", // Europa
        "0x87787cAacb6b928eb122D761eF1424217552Ac5F", // Orochimaru
        "0xAdE5aE3e71ff1E6D1E1e849d18A4DF27189a61be", // Alien
        "0x68d592B7ebae2Cf80aA911BDD9679E927f3d70Ef", // Unicorn2
        "0x3E1a7a4eDEDdc1dA14D315800f2b368EeDaFd84e", // Uniknight
      ]
      const shuffledContracts = shuffleArray(contracts)

      for (const contract of shuffledContracts) {
        const tx = await claimNFT(wallet.private_key, contract)
        logger.info(`https://sepolia.uniscan.xyz/tx/${tx?.hash} (${wallet.address})`)
        await sleepInRange(SLEEP_MINT[0], SLEEP_MINT[1])
      }
    } catch (err) {
      logger.error(err)
    }
  }
}
