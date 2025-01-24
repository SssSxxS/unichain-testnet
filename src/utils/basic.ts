import { sleep } from "bun"
import { logger } from "./logger"

export const getRandomNumFloor = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

export const getRandomNumToFixed = (min: number, max: number, toFixed: number) =>
  (Math.random() * (max - min) + min).toFixed(toFixed)

export const sleepInRange = async (min: number, max: number) => {
  const r = getRandomNumFloor(min, max)
  logger.info(`Sleeping for ${r} seconds...`)
  await sleep(r * 1000)
}

export const shuffleArray = <T>(array: T[]) => {
  const shuffledArray = [...array]
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }
  return shuffledArray
}
