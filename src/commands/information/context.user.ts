import { ApplicationCommandType, UserContextMenuCommandInteraction } from 'discord.js';
import { Command } from '../../utils/commands';
import { userInformation } from '../../utils/functions/commands/user';

export default new Command({
    data: {
        name: 'User Information',
        type: ApplicationCommandType.User
    },

    run: async (interaction: UserContextMenuCommandInteraction) => {
        await userInformation({
            interaction: interaction,
            target: interaction.targetUser,
            ephemeral: true
        });
    }
});