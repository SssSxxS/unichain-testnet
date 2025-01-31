# Unichain-Testnet

[![My GitHub](https://img.shields.io/badge/@yofomo-YouTube-red)](https://www.youtube.com/watch?v=VFrI-5VOB6M)
[![My GitHub](https://img.shields.io/badge/@yofomo-Telegram-blue)](https://t.me/yofomo)

![Alt text](https://i.imgur.com/MNMGEre.png)

## Requirements

- [**Bun**](https://bun.sh/)

  ```
  powershell -c "irm bun.sh/install.ps1 | iex"
  ```

## Configuration

- **private_keys.txt**: `data/private_keys.txt` | 1 line = 1 wallet
- **config.ts**: `data/config.ts`
  ![Alt text](https://i.imgur.com/PwEc5Op.png)

## Usage

1. To start the program, open **START.bat** or run:

   ```
   bun i
   bun .\index.ts
   ```

2. Create a database by selecting the **"Recreate database"**

3. Update wallet balances in the database by selecting the **"Update balances values"**

4. Select whatever you want

## Notes

- For `UPDATE.bat`, you must have [Git](https://git-scm.com/downloads) installed and the repository must be cloned
- To view the SQLite database file, you can use tools like [DB Browser for SQLite](https://sqlitebrowser.org/)
- If the wallet has previously minted nft, the software will just send a transaction that will fail
