import {
    ChatInputCommandInteraction,
    ActivityType,
    ContextMenuCommandInteraction,
    User,
    EmbedBuilder,
    GuildMember,
    escapeMarkdown
} from "discord.js";
import axios from 'axios';
import * as emojis from '../../../assets/emojis.json';
import * as names from '../../../assets/names.json';
import { toTitleCase } from '../toTitleCase';

export async function userInformation({ interaction, target, showPermissions, ephemeral }: {
    interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction,
    target: User,
    showPermissions?: boolean,
    ephemeral?: boolean;
}) {
    const user = await axios.get(`https://discord.com/api/v10/users/${target.id}`, {
        headers: { Authorization: `Bot ${interaction.client.token}` }
    }).then(u => u.data);

    let member: GuildMember;

    if (interaction.guild && interaction.guild.members.cache.has(target.id)) {
        member = await interaction.guild.members.fetch(target.id);
    }

    let name: string;

    if (member && member.nickname) {
        name = `\n${emojis.blank}Tag: ${escapeMarkdown(target.tag)}\n${emojis.blank}Server: ${escapeMarkdown(member.nickname)}`;
    } else name = escapeMarkdown(target.tag);

    const embed = new EmbedBuilder({
        title: `${target.username}'s Profile`,
        thumbnail: { url: target.avatar ? `https://cdn.discordapp.com/avatars/${target.id}/${target.avatar}.${target.avatar.startsWith('a_') ? 'gif' : 'png'}?size=1024` : target.displayAvatarURL() },
        image: { url: user.banner ? `https://cdn.discordapp.com/banners/${target.id}/${user.banner}.${user.banner.startsWith('a_') ? 'gif' : 'png'}?size=1024` : null },
        description: `<@${target.id}> ${member ? (member.id == interaction.guild.ownerId ? emojis.ownerCrown : '') : ''}`,
        fields: [
            {
                name: 'Information', value: `
**Name:** ${name}
**Member since:**
${emojis.blank}Discord: <t:${~~(target.createdTimestamp / 1000)}> ${member ? `\n${emojis.blank}Server: <t:${~~(member.joinedTimestamp / 1000)}>` : ''}
**Type:** ${target.bot ? 'Bot' : 'User'}
**ID:** ${target.id}
                    `
            }
        ]
    });

    if (target.flags.bitfield != 0) {
        embed.addFields({
            name: 'Badges', value: `
${target.flags.toArray().filter(f => emojis.userFlags[f]).map(f => emojis.userFlags[f]).join('\n')}
                `
        });
    }

    if (member) {
        let roles: string;

        if (member.roles.cache.size > 50) {
            roles = 'There are too many roles to show!';
        } else {
            roles = member.roles.cache.sort((a, b) => b!.position - a!.position)
                .filter(role => role != interaction.guild.roles.everyone)
                .map(role => `<@&${role.id}>`)
                .join(' ');
        }

        if (member.roles.cache.size > 0) {
            embed.addFields({ name: `Roles (${member.roles.cache.size - 1})`, value: roles });
        }

        let presence: string;

        if (!member?.presence || member?.presence?.status == 'offline') {
            presence = `**Right now:** ${emojis.memberPresence['offline']}`;
        } else {
            const status = member.presence.member.presence?.activities?.find(a => a.type == ActivityType.Custom);

            presence = `${Object.keys(member.presence?.clientStatus)
                .map(status => `**${toTitleCase(status)}:** ${emojis.memberPresence[(member.presence?.clientStatus)[status]]}`)
                .join('\n')} ${status ? `\n**Custom:** ${status.emoji || ''} ${status.state ? `${escapeMarkdown(status.state)}` : ''}` : ''}`;
        }

        embed.addFields({ name: 'Presence', value: presence });

        if (
            showPermissions
            && interaction.memberPermissions.has('ManageRoles')
            && member.permissions.toArray().length > 0
        ) {
            const permissions = member.permissions.toArray().filter(p => names.permissions[p]).map(p => names.permissions[p]).join(', ');

            embed.addFields({ name: 'Permissions', value: `\`\`\`${permissions}\`\`\`` });
        }
    }

    interaction.reply({ embeds: [embed], ephemeral: ephemeral });
}