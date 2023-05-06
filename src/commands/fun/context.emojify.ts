import { ApplicationCommandType, MessageContextMenuCommandInteraction } from 'discord.js';
import { Command } from '../../utils/commands';
import { emojify } from '../../utils/functions/commands/emojify';

export default new Command({
    data: {
        name: 'Emojify',
        type: ApplicationCommandType.Message
    },

    run: async (interaction: MessageContextMenuCommandInteraction) => {
        if (!interaction.targetMessage.content) {
            interaction.reply({
                content: 'This message has no content.',
                ephemeral: true
            });
        }

        emojify(interaction, interaction.targetMessage.content, true);
    }
});