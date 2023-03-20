import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../../structures/command";

export default new Command({
    data: {
        name: "ping",
        description: "Check the latency of the bot"
    },

    run: async (interaction: ChatInputCommandInteraction) => {
        await interaction.reply({ content: "🏓", fetchReply: true });

        return interaction.editReply(`
Latency is **${~~interaction.client.ws.ping}ms.**
Response time is **${~~(Date.now() - interaction.createdTimestamp)}ms.**
        `);
    }
});