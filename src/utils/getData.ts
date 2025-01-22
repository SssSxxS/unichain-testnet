import fs from "fs"

export const getPrivateKeys = () => {
  let privateKeys: string[] = fs
    .readFileSync(`./data/private_keys.txt`, "utf-8")
    .split("\n")
    .map((item) => item.trim())
    .filter((item) => item !== "")
  return privateKeys
}
