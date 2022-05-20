const discord = require("discord.js")
const Event = require("../bot/classes/event");

module.exports = new Event({
    name: "messageCreate",

    /** @param {discord.Message} message */
    async run(client, message) {
        if (message.content.match(new RegExp(`^<@!?${client.user.id}>$`))) {

            return message.reply({
                content: "Hey! I'm Shade. Type **/** to start using my commands!"
            });
        }
    }
});