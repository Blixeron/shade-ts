import { Command } from "../../bot/classes/command";

export default new Command({
    data: {
        name: "ping",
        description: "Check my latency."
    },

    run: async ({ client, interaction }) => {
        interaction.reply(`Hey! Latency is ${client.ws.ping}ms.`);
    }
});