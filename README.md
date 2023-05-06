# Shade, my personal Discord bot, written in TypeScript, using Discord.js

## Instalation

Clone this repository, and install the dependencies by using `npm i -D`. Then you can start the bot by using `npm run dev`.
## Configuration File

There's a hidden file that stores sensitive information, called `config.json`. If you want to run the bot, you must create it inside of the bot's folder.

This is how it looks like:
```json
{
    "token": "The token of your Discord application",
    "cat_api_token": "The token to execute requests to https://thecatapi.com"
}
```