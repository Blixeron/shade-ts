import { ClientEvents } from "discord.js";

interface ListenerOptions<key extends keyof ClientEvents> {
    name: key;
    run: (...args: ClientEvents[key]) => void;
}

export class Listener<key extends keyof ClientEvents> {
    public name: ListenerOptions<key>[`name`];
    public run: ListenerOptions<key>[`run`];

    constructor(options: ListenerOptions<key>) {
        Object.assign(this, options);
    };
};