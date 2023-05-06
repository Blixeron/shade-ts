import { ApplicationCommandType, MessageContextMenuCommandInteraction } from 'discord.js';
import { Command } from '../../utils/commands';
import { sort } from '../../utils/functions/commands/sort';

export default new Command({
    data: {
        name: 'Sort',
        type: ApplicationCommandType.Message
    },

    run: async (interaction: MessageContextMenuCommandInteraction) => {
        if (!interaction.targetMessage.content) {
            interaction.reply({
                content: 'This message has no content.',
                ephemeral: true
            });
        }

        sort(interaction, interaction.targetMessage.content, true);
    }
});