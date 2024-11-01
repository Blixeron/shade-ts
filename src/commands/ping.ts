import { ChatInputCommandInteraction } from 'discord.js';
import { Command } from '../classes/Command';

export default new Command({
    data: {
        name: 'ping',
        description: 'Check my latency.'
    },

    run: async (interaction: ChatInputCommandInteraction) => {
        return interaction.reply(`🏓 Latency is **${~~interaction.client.ws.ping}ms.**`);
    }
});