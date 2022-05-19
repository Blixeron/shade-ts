const Command = require("../../bot/classes/command");

module.exports = new Command({
    data: {
        name: "ping",
        description: "Check my latency.",
    },

    run: async ({ client, interaction }) => {
        return interaction.reply(
            `Hey! The Websocket latency is **${client.ws.ping}ms.**`
        );
    }
});