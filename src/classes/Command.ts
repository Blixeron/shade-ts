import { ApplicationCommandData } from "discord.js";

interface CommandOptions {
    data: ApplicationCommandData;
    run: (...args: any) => any;
}

export class Command {
    public data: CommandOptions['data'];
    public run: CommandOptions['run'];

    constructor(options: CommandOptions) {
        Object.assign(this, options);
    }
}