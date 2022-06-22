const discord = require("discord.js");
const secrets = require("../secrets.json");
const check = require("../utils/check");
const Command = require("./classes/command");
const commands = require("./loaders/commands");
const events = require("./loaders/events");

module.exports = class Shade extends discord.Client {
    /** @type {discord.Collection<string, { name: string, commands: string[] }>} */
    categories = new discord.Collection;
    /** @type {discord.Collection<string, Command>} */
    commands = new discord.Collection;

    secrets = secrets;
    developer = secrets.discord.developer;
    guild = secrets.discord.guild;
    discord = discord;
    check = check;

    loadModules() {
        commands.load(this);
        events.load(this);
    }

    constructor() {
        super({
            intents: [
                discord.Intents.FLAGS.GUILDS,
                discord.Intents.FLAGS.GUILD_MEMBERS,
                discord.Intents.FLAGS.GUILD_MESSAGES,
                discord.Intents.FLAGS.GUILD_PRESENCES
            ]
        });
    }

    async start() {
        await this.login(secrets.discord.token);
        this.loadModules();
    }
};