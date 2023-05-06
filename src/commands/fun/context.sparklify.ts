import { ApplicationCommandType, MessageContextMenuCommandInteraction } from 'discord.js';
import { Command } from '../../utils/commands';
import { sparklify } from '../../utils/functions/commands/sparklify';

export default new Command({
    data: {
        name: 'Sparklify',
        type: ApplicationCommandType.Message
    },

    run: async (interaction: MessageContextMenuCommandInteraction) => {
        if (!interaction.targetMessage.content) {
            interaction.reply({
                content: 'This message has no content.',
                ephemeral: true
            });
        }

        sparklify(interaction, interaction.targetMessage.content, true);
    }
});