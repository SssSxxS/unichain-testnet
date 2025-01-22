import pino from "pino"
import fs from "fs"

const logsPath = "./data/logs"
if (!fs.existsSync(logsPath)) fs.mkdirSync(logsPath, { recursive: true })

export const logger = pino({
  level: "trace",
  transport: {
    targets: [
      {
        level: "trace",
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss.l",
          ignore: "pid,hostname",
        },
      },
      {
        level: "trace",
        target: "pino-pretty",
        options: {
          destination: `./data/logs/${new Date()
            .toLocaleDateString(undefined, { day: "2-digit", month: "2-digit", year: "numeric" })
            .replace(/[/]/g, "-")}.log`,
          colorize: false,
          translateTime: "HH:MM:ss.l",
          ignore: "pid,hostname",
        },
      },
    ],
  },
})

// logger.trace("Trace message")
// logger.debug("Debug message")
// logger.info("Info message")
// logger.warn("Warn message")
// logger.error("Error message")
// logger.fatal("Fatal message")
