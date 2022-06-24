const Command = require("../../main/classes/command");

module.exports = new Command({
    data: {
        name: "ping",
        description: "Check my latency",
    },

    run: async ({ client, interaction }) => {
        return interaction.reply(
            `Pong! Websocket latency is **${client.ws.ping}ms**, response time is **${Date.now() - interaction.createdTimestamp}ms** though.`
        );
    }
});