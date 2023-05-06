import { ApplicationCommandOptionType, AttachmentBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Command } from '../../utils/commands';
import { userAvatar } from '../../utils/functions/commands/avatar';

export default new Command({
    data: {
        name: 'avatar',
        description: 'Shows the avatar of someone.',
        options: [
            {
                name: 'target',
                description: 'Who to show the avatar of; if not provided, defaults to yourself.',
                type: ApplicationCommandOptionType.User
            },
            {
                name: 'size',
                description: 'The size of the image, defaults to 1024 pixels.',
                type: ApplicationCommandOptionType.Integer,
                choices: [
                    { name: '128', value: 128 },
                    { name: '256', value: 256 },
                    { name: '512', value: 512 },
                    { name: '1024', value: 1024 },
                    { name: '2048', value: 2048 },
                    { name: '4096', value: 4096 }
                ]
            },
            {
                name: 'format',
                description: 'The format of the image, defaults to PNG, or GIF if the avatar is animated.',
                type: ApplicationCommandOptionType.String,
                choices: [
                    { name: 'JPG', value: 'jpg' },
                    { name: 'JPEG', value: 'jpeg' },
                    { name: 'WEBP', value: 'webp' },
                    { name: 'PNG', value: 'png' },
                    { name: 'GIF', value: 'gif' }
                ]
            },
            {
                name: 'server_avatar',
                description: 'Whether to show the server avatar (if any) or the default avatar.',
                type: ApplicationCommandOptionType.Boolean
            }
        ]
    },

    run: async (interaction: ChatInputCommandInteraction) => {
        const target = interaction.options.getUser('target') || interaction.user;
        const size = interaction.options.getInteger('size') || 1024;
        const format = interaction.options.getString('format');
        const serverAvatar = interaction.options.getBoolean('server_avatar') || false;

        await userAvatar({
            interaction: interaction,
            target: target,
            size: size,
            format: format,
            serverAvatar: serverAvatar
        });
    }
});