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

export const main = async () => {
  try {
    while (true) {
      await sleep(1000)
      const choice = await select({
        message: "MENU:",
        choices: [
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
            name: "Deploy ERC-20 Token",
            short: chalk.bold("Deploy ERC-20 Token"),
            value: "deployErc20",
          },
          {
            name: "Deploy ERC-721 Token",
            short: chalk.bold("Deploy ERC-721 Token"),
            value: "deployErc721",
            disabled: true,
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
            name: "Exit",
            short: chalk.bold("Exit"),
            value: "null",
          },
        ],
        pageSize: 99,
        loop: false,
      })

      switch (choice) {
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
        case "deployErc20":
          await deployErc20()
          break
        case "deployErc721":
          await deployErc721()
          break

        case "recreateDatabase":
          await recreateDatabase()
          break
        case "updateBalances":
          await updateBalances()
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
