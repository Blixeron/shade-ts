import { ChatInputCommandInteraction, UserContextMenuCommandInteraction, User, AttachmentBuilder } from 'discord.js';

export async function userAvatar({ interaction, target, size, format, serverAvatar, ephemeral }: {
    interaction: ChatInputCommandInteraction | UserContextMenuCommandInteraction;
    target?: User;
    size?: number;
    format?: string;
    serverAvatar?: boolean;
    ephemeral?: boolean;
}) {
    let avatar = { hash: target.avatar, url: target.avatarURL() };

    if (serverAvatar && interaction.guild && interaction.guild.members.cache.has(target.id)) {
        const member = await interaction.guild.members.fetch(target.id);

        if (member.avatar) {
            avatar = { hash: member.avatar, url: member.avatarURL() };
        }
    }

    if (format) {
        if (format == 'gif') {
            format = avatar.hash.startsWith('a_') ? 'gif' : 'png';
        }
    } else {
        format = avatar.hash.startsWith('a_') ? 'gif' : 'png';
    }

    await interaction.deferReply({ ephemeral: ephemeral });

    const attachment = new AttachmentBuilder(avatar.url.replace('webp', format) + `?size=${size}`);

    return interaction.followUp({
        content: `**${target.tag}** - **${size}** pixels, in **${format.toUpperCase()}** format. - [Link](<${avatar.url.replace('webp', format) + `?size=${size}`}>)`,
        files: [attachment],
        ephemeral: ephemeral
    });
}