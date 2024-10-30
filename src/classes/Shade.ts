import { readdirSync } from 'fs';
import { join } from 'path';

import { Client, IntentsBitField, Collection, ClientEvents } from 'discord.js';

import { Command } from './Command';
import { Listener } from './Listener';

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

        process.loadEnvFile();
    }

    public commands = new Collection<string, Command>();

    public loadCommands() {
        const files = readdirSync(join(__dirname, '..', 'commands'));
        for (const file of files) {
            const command: Command = require(`../commands/${file}`).default;
            this.commands.set(command.data.name, command);
        }
    }

    public loadListeners() {
        for (const file of readdirSync(join(__dirname, '..', 'listeners'))) {
            const listener: Listener<keyof ClientEvents> = require(`../listeners/${file}`).default;

            this.on(listener.name, (...args) => listener.run(...args));
        }
    }

    public async start() {
        this.loadCommands();
        this.loadListeners();
        
        await this.login(process.env.DISCORD_TOKEN).then(() => {
            console.log('Logged in using static token...');
        });
    }
}