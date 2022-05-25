const discord = require("discord.js");
const secrets = require("../secrets.json");
const Command = require("./classes/command");
const commands = require("./loaders/commands");
const events = require("./loaders/events");

module.exports = class Shade extends discord.Client {
    /** @type {discord.Collection<string, { name: string, commands: string[] }>} */
    categories = new discord.Collection;
    /** @type {discord.Collection<string, Command>} */
    commands = new discord.Collection;

    developer = secrets.discord.developer;
    guild = secrets.discord.guild;

    constructor() {
        super({
            intents: [
                discord.Intents.FLAGS.GUILDS,
                discord.Intents.FLAGS.GUILD_MESSAGES,
                discord.Intents.FLAGS.GUILD_PRESENCES
            ]
        });
    }

    async start() {
        await this.login(secrets.discord.token);
        commands.load(this);
        events.load(this);
    }
};