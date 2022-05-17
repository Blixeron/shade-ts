import discord from "discord.js";
import { Shade } from "../client";

// Here we declare the correct classes for the thing hat we want to use.
interface EventData {
    name: keyof discord.ClientEvents;
    // Below is the Run Function, and we're declaring it's parameters.
    run: (client: Shade, interaction: discord.CommandInteraction) => void;
};

// Exporting the class so we can use it in event files.
export class Event {
    public name: EventData['name'];
    public run: EventData['run'];

    constructor(eventOptions: EventData) {
        Object.assign(this, eventOptions);
    }
}