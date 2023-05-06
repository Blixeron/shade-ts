import { ApplicationCommandOptionType, ChatInputCommandInteraction } from 'discord.js';
import { Command } from '../../utils/commands';
import { userInformation } from '../../utils/functions/commands/user';

export default new Command({
    data: {
        name: 'user',
        description: 'Shows information about a Discord user.',
        options: [
            {
                name: 'target',
                description: 'The user to show information of.',
                type: ApplicationCommandOptionType.User
            },
            {
                name: 'show_permissions',
                description: 'Whether to show the permissions this user has or not. Manage Roles permissions are required.',
                type: ApplicationCommandOptionType.Boolean
            }
        ]
    },

    run: async (interaction: ChatInputCommandInteraction) => {
        await userInformation({
            interaction: interaction,
            target: interaction.options.getUser('target') || interaction.user,
            ephemeral: interaction.options.getBoolean('show_permissions')
        });
    }
});