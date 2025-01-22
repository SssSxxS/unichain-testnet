import chalk from "chalk"
import { main } from "./src/main"

const art = `
░█░█░█▀█░▀█▀░█▀▀░█░█░█▀█░▀█▀░█▀█
░█░█░█░█░░█░░█░░░█▀█░█▀█░░█░░█░█
░▀▀▀░▀░▀░▀▀▀░▀▀▀░▀░▀░▀░▀░▀▀▀░▀░▀
░▀█▀░█▀▀░█▀▀░▀█▀░█▀█░█▀▀░▀█▀    
░░█░░█▀▀░▀▀█░░█░░█░█░█▀▀░░█░    
░░▀░░▀▀▀░▀▀▀░░▀░░▀░▀░▀▀▀░░▀░    
https://t.me/yofomo
`
console.log(chalk.magentaBright(art))

main()
