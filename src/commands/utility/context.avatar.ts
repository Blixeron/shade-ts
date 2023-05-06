import { ApplicationCommandType, UserContextMenuCommandInteraction } from 'discord.js';
import { Command } from '../../utils/commands';
import { userAvatar } from '../../utils/functions/commands/avatar';

export default new Command({
    data: {
        name: 'User Avatar',
        type: ApplicationCommandType.User
    },

    run: async (interaction: UserContextMenuCommandInteraction) => {
        await userAvatar({
            interaction: interaction,
            target: interaction.targetUser,
            size: 1024,
            ephemeral: true
        });
    }
});