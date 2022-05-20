const Command = require("../../bot/classes/command");

module.exports = new Command({
    data: {
        name: "ping",
        description: "Check my latency."
    },

    permission: "ADMINISTRATOR",

    run: async ({ client, interaction }) => {
        return interaction.reply(
            `Hey! Latency is **${client.ws.ping}ms.** My response time is **${Date.now() - interaction.createdTimestamp}ms.**`
        );
    }
});