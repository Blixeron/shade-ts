import { ApplicationCommandData, PermissionsString } from "discord.js";

type CommandOptions = {
    data: ApplicationCommandData;
    ownerOnly?: boolean;
    botPermissions?: Array<PermissionsString>;
    run: (...args: any) => any;
};

export class Command {
    public data: CommandOptions["data"];
    public ownerOnly: boolean;
    public botPermissions: CommandOptions["botPermissions"];
    public run: CommandOptions["run"];

    constructor(options: CommandOptions) {
        Object.assign(this, options);
    }
}