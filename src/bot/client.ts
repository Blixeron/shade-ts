import discord from "discord.js";
import commands from "./loaders/commands";
import events from "./loaders/events";
import secrets from "../secrets.json";

import { Command } from "./classes/command";

export class Shade extends discord.Client {
    // Creating collections.
    public categories: discord.Collection<string, { name: string, commands: string; }> = new discord.Collection;
    public commands: discord.Collection<string, Command> = new discord.Collection;
    // Declaring client variables.
    public developer = secrets.developer;
    public guild = secrets.guild;

    // Setting up the intents for the client.
    constructor() {
        super({ intents: [discord.Intents.FLAGS.GUILDS] });
    }

    // Start method.
    public async start() {
        await this.login(secrets.token) // Login to Discord.
        await commands.load(this) // Load commands.
        await events.load(this) // Load events.
    }
};