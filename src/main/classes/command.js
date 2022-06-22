const discord = require("discord.js");
const Shade = require("../client");

/** 
 * @typedef {Object} RunOptions
 * @property {Shade} client
 * @property {discord.CommandInteraction | discord.ContextMenuInteraction} interaction
 */

/** @typedef {(options: RunOptions) => any} RunFunction */

/**
 * @typedef {{
 *     data: discord.ApplicationCommandData;
 *     permission?: discord.PermissionResolvable;
 *     guildOnly?: boolean;
 *     ownerOnly?: boolean;
 *     run: RunFunction;
 * }} CommandOptions
 */

module.exports = class Command {
    /** @type {discord.ApplicationCommandData} */
    data;
    /** @type {discord.PermissionResolvable} */
    permission;
    /** @type {boolean} */
    guildOnly;
    /** @type {boolean} */
    ownerOnly;
    /** @type {RunFunction} */
    run;

    /** @param {CommandOptions} commandOptions */
    constructor(commandOptions) {
        Object.assign(this, commandOptions);
    }
};