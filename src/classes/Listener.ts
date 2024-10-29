import { ClientEvents } from 'discord.js';

interface ListenerOptions<K extends keyof ClientEvents> {
    name: K;
    run: (...args: ClientEvents[K]) => void;
}

export class Listener<key extends keyof ClientEvents> {
    public name: ListenerOptions<key>['name'];
    public run: ListenerOptions<key>['run'];

    constructor(options: ListenerOptions<key>) {
        Object.assign(this, options);
    }
}