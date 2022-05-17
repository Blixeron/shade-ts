import discord from "discord.js";
import { Shade } from "../client";

// Here we declare the correct classes for the thing that we want to use.
export interface RunOptions {
    client: Shade;
    interaction: discord.CommandInteraction;
};

// Exporting the Run function.
export type RunFunction = (options: RunOptions) => any;

// Declaring the types of the options, for type checking.
export type CommandOptions = {
    data: discord.ApplicationCommandDataResolvable;
    userPermissions?: discord.PermissionResolvable[];
    ownerOnly?: boolean;
    run: RunFunction;
};

// Exporting the class, so we can use it in command files.
export class Command {
    public data: discord.ApplicationCommandDataResolvable;
    public userPermissions?: discord.PermissionResolvable;
    public ownerOnly?: boolean;
    public run: RunFunction;

    constructor(commandOptions: CommandOptions) {
        Object.assign(this, commandOptions);
    }
};