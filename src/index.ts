import { Client, IntentsBitField, ClientEvents } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { Listener } from './utils/listener';
import { Command } from './utils/commands';
import { Logger } from './utils/logger';
import * as config from './config.json';

export class Shade extends Client {
    constructor() {
        super({
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMembers,
                IntentsBitField.Flags.GuildPresences
            ],
            allowedMentions: { parse: [] }
        });
    }

    public config = config;

    public async start() {
        Command.loadCommands();

        // Loading listeners
        for (const file of readdirSync(join(__dirname, './listeners'))) {
            const listener: Listener<keyof ClientEvents> = require(`./listeners/${file}`).default;

            this.on(listener.name, (...args) => listener.run(...args));
        }

        await this.login(config.token).then(() => {
            Logger.log({ message: 'Logged in using static token' });
        });
    }
}

new Shade().start();

process.on('uncaughtException', function (err) {
    Logger.log({ message: err as unknown as string, label: 'ERROR', color: Logger.Formatting.red });
});