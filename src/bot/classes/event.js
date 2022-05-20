const discord = require("discord.js");
const Shade = require("../client");

/**
 * @typedef {Object} EventData
 * @property {keyof discord.ClientEvents} name
 * @property {(client: Shade, any) => void} run
 */

module.exports = class Event {
    /** @type {EventData["name"]} */
    name;
    /** @type {EventData["run"]} */
    run;

    /** @param {EventData} eventOptions */
    constructor(eventOptions) {
        Object.assign(this, eventOptions);
    }
}