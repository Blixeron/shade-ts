import { ApplicationCommandData, Collection } from 'discord.js';

import { readdirSync } from 'fs';
import { join } from 'path';

export const commands: Collection<string, Command> = new Collection;

interface CommandOptions {
    data: ApplicationCommandData;
    run: (...args: any) => any;
}

export class Command {
    public data: CommandOptions['data'];
    public run: CommandOptions['run'];

    static loadCommands() {
        for (const folder of readdirSync(join(__dirname, '..', './commands'))) {
            const files = readdirSync(join(__dirname, '..', './commands', folder));

            for (const file of files) {
                const command: Command = require(`../commands/${folder}/${file}`).default;
                commands.set(command.data.name, command);
            }
        }
    }

    constructor(options: CommandOptions) {
        Object.assign(this, options);
    }
}

