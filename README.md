# Shade: My personal Discord Bot written in JavaScript, using Discord.js

## Guide
I tried to make this as friendly as posible for everyone. If you're new to this, maybe this can help you.

## Installation
Clone this repository, and run this command in your terminal, once you're inside of the folder that has the bot: `npm install`, which will automatically install all the dependencies that the bot has.

## secrets.json File
There's a secrets.json file inside of the ./src folder, where you store private information. I can't show mine, but here's how it looks like:
```json
{
    "discord": {
        "token": "Your bot's token.",
        "developer": "Your own ID.",
        "guild": "The server you're going to register the commands to. Also referred as 'Development Server.'"
    },
    "twitter": {
        "api_key": "Your Twitter application Ley.",
        "api_key_secret": "Your Twitter application Secret Key.",
        "token": "Your Twitter application Bearer Token."
    }
}
```

## Useful links
- [Discord.js official guide](https://discordjs.guide/#before-you-begin)
- [Discord.js official documentation](https://discord.js.org/#/docs/discord.js/stable/general/welcome)
- [Discord.js official Discord Server](https://discord.gg/djs)