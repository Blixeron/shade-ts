import { Client, IntentsBitField, Collection, ClientEvents } from "discord.js";

import { readdirSync } from "fs";
import { join } from "path";

import { Listener } from "./structures/listener";
import { Command } from "./structures/command";

import * as config from "./config.json";

export const commands: Collection<string, Command> = new Collection;

export class Shade extends Client {
    constructor() {
        super({
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMembers,
                IntentsBitField.Flags.GuildPresences
            ]
        });
    }

    public config = config;

    public async start() {
        // Loading commands
        for (const folder of readdirSync(join(__dirname, "./commands"))) {
            const files = readdirSync(join(__dirname, "./commands", folder));

            for (const file of files) {
                const command: Command = require(`./commands/${folder}/${file}`).default;
                commands.set(command.data.name, command);
            }
        }

        // Loading listeners
        for (const file of readdirSync(join(__dirname, "./listeners"))) {
            const listener: Listener<keyof ClientEvents> = require(`./listeners/${file}`).default;

            this.on(listener.name, (...args) => listener.run(...args));
        }

        this.login(config.token);
    }
}

new Shade().start();