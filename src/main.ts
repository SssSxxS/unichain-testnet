import { select, Separator } from "@inquirer/prompts"
import { logger } from "./utils/logger"
import chalk from "chalk"
import { recreateDatabase } from "./functions/recreateDatabase"
import { sleep } from "bun"
import { updateBalances } from "./functions/updateBalances"
import { bridgeSuper } from "./functions/bridgeSuper"
import { bridgeBrid } from "./functions/bridgeBrid"
import { deployErc20 } from "./functions/deployErc20"
import { deployErc721 } from "./functions/deployErc721"
import { mintUnicorn } from "./functions/mintUnicorn"
import { mintEuropa } from "./functions/mintEuropa"
import { mintOrochimaru } from "./functions/mintOrochimaru"
import { randomBridge } from "./functions/randomBridge"
import { randomMint } from "./functions/randomMint"
import { getFeeData } from "./functions/getFeeData"
import { mintAlien } from "./functions/mintAlien"
import { mintUnicorn2 } from "./functions/mintUnicorn2"

export const main = async () => {
  try {
    while (true) {
      await sleep(1000)
      const choice = await select({
        message: "MENU:",
        choices: [
          {
            name: "Get Base Fee",
            short: chalk.bold("Get Base Fee"),
            value: "getFeeData",
          },
          new Separator(" "),
          {
            name: "Recreate database",
            short: chalk.bold("Recreate database"),
            value: "recreateDatabase",
          },
          {
            name: "Update balances values",
            short: chalk.bold("Update balances values"),
            value: "updateBalances",
          },
          new Separator(" "),
          {
            name: "Random Bridge Sepolia to Unichain",
            short: chalk.bold("Random Bridge Sepolia to Unichain"),
            value: "randomBridge",
          },
          {
            name: "Random Mint NFTs (all in a different order)",
            short: chalk.bold("Random Mint NFTs"),
            value: "randomMint",
          },
          new Separator(" "),
          {
            name: "Bridge Sepolia to Unichain | https://superbridge.app/",
            short: chalk.bold("Bridge Sepolia to Unichain | https://superbridge.app/"),
            value: "bridgeSuper",
          },
          {
            name: "Bridge Sepolia to Unichain | https://www.brid.gg/",
            short: chalk.bold("Bridge Sepolia to Unichain | https://www.brid.gg/"),
            value: "bridgeBrid",
          },
          new Separator(" "),
          {
            name: "Mint Unicorn NFT | https://morkie.xyz/unicorn",
            short: chalk.bold("Mint Unicorn NFT | https://morkie.xyz/unicorn"),
            value: "mintUnicorn",
          },
          {
            name: "Mint Europa NFT | https://morkie.xyz/europa",
            short: chalk.bold("Mint Europa NFT | https://morkie.xyz/europa"),
            value: "mintEuropa",
          },
          {
            name: "Mint Orochimaru NFT | https://www.nerzo.xyz/orochimaru",
            short: chalk.bold("Mint Orochimaru NFT | https://www.nerzo.xyz/orochimaru"),
            value: "mintOrochimaru",
          },
          {
            name: "Mint Alien NFT | https://morkie.xyz/alien",
            short: chalk.bold("Mint Alien NFT | https://morkie.xyz/alien"),
            value: "mintAlien",
          },
          {
            name: "Mint Unicorn2 NFT | https://morkie.xyz/unicorn2",
            short: chalk.bold("Mint Unicorn2 NFT | https://morkie.xyz/unicorn2"),
            value: "mintUnicorn2",
          },
          new Separator(" "),
          {
            name: "Deploy ERC-20 Token",
            short: chalk.bold("Deploy ERC-20 Token"),
            value: "deployErc20",
          },
          {
            name: "Deploy ERC-721 Token",
            short: chalk.bold("Deploy ERC-721 Token"),
            value: "deployErc721",
          },
          new Separator(" "),
          {
            name: "Exit",
            short: chalk.bold("Exit"),
            value: "null",
          },
        ],
        pageSize: 99,
        loop: false,
      })

      switch (choice) {
        case "getFeeData":
          await getFeeData()
          break

        case "recreateDatabase":
          await recreateDatabase()
          break
        case "updateBalances":
          await updateBalances()
          break

        case "randomBridge":
          await randomBridge()
          break
        case "randomMint":
          await randomMint()
          break

        case "bridgeSuper":
          await bridgeSuper()
          break
        case "bridgeBrid":
          await bridgeBrid()
          break

        case "mintUnicorn":
          await mintUnicorn()
          break
        case "mintEuropa":
          await mintEuropa()
          break
        case "mintOrochimaru":
          await mintOrochimaru()
          break
        case "mintAlien":
          await mintAlien()
          break
        case "mintUnicorn2":
          await mintUnicorn2()
          break

        case "deployErc20":
          await deployErc20()
          break
        case "deployErc721":
          await deployErc721()
          break

        default:
          logger.info("Exiting...")
          process.exit(0)
      }
    }
  } catch (err) {
    logger.error(err)
  }
}
