const Command = require("../../main/classes/command");

module.exports = new Command({
    data: {
        name: "ping",
        description: "Check my latency",
    },

    run: async ({ client, interaction }) => {
        const emojis = ["🏓", "🚀", "🔥", "😀", "💥"];
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];

        return interaction.reply(
            `${emoji} Pong! Websocket latency is **${client.ws.ping}ms**, response time is **${Date.now() - interaction.createdTimestamp}ms** though.`
        );
    }
});