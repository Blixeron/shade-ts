import { ApplicationCommandData } from "discord.js";

type CommandOptions = {
    data: ApplicationCommandData;
    ownerOnly?: boolean;
    disableDm?: boolean;
    run: (...args: any) => any;
};

export class Command {
    public data: CommandOptions["data"];
    public ownerOnly: boolean;
    public disableDm: boolean;
    public run: CommandOptions["run"];

    constructor(options: CommandOptions) {
        Object.assign(this, options);
    }
}