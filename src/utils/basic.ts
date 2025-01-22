import { sleep } from "bun"
import { logger } from "./logger"

export const getRandomNumFloor = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min)

export const getRandomNumToFixed = (min: number, max: number, toFixed: number) =>
  (Math.random() * (max - min) + min).toFixed(toFixed)

export const sleepInRange = async (min: number, max: number) => {
  const r = getRandomNumFloor(min, max)
  logger.info(`Sleeping for ${r} seconds...`)
  await sleep(r * 1000)
}
