import { Interaction } from "detritus-client";
import { ChannelTypes, GuildExplicitContentFilterTypes } from "detritus-client/lib/constants";
import { Embed } from "detritus-client/lib/utils";
import { GuildExplicitContentFilter, GuildMfaLevel, GuildVerificationLevel } from "../../../../assets/constants";

import { BaseCommandOption } from "../../../baseCommand";

export class ServerInformationCommand extends BaseCommandOption {
    name = "information";
    description = "Check information about the current server";

    async run(context: Interaction.InteractionContext) {
        const embed = new Embed;

        embed.setTitle(`${context.guild?.name}`);

        embed.setDescription(context.guild?.description || "No description");

        if (context.guild?.icon) {
            embed.setThumbnail(`${context.guild?.iconUrl?.slice(0, -3)}${context.guild?.iconUrl?.startsWith("a_") ? "gif" : "png"}?size=1024`);
        }

        if (context.guild?.banner) {
            embed.setThumbnail(`${context.guild?.bannerUrl?.slice(0, -3)}${context.guild?.bannerUrl?.startsWith("a_") ? "gif" : "png"}?size=1024`);
        }

        embed.addField("General", `
**ID:** ${context.guild?.id}
**Owner:** ${context.guild?.owner?.mention}
**Created:** <t:${Math.ceil(context.guild?.createdAtUnix as number / 1000)}>
        `);

        embed.addField(`Roles (${context.guild?.roles.length})`, `
${context.guild?.roles.sort((a, b) => b?.position - a?.position).filter(role => role?.id != context.guild?.id).map(role => role?.mention).join(" ") || `None`}
        `);

        embed.addField("Channels", `
**Categories**: ${context.guild?.channels.filter(channel => channel?.type == ChannelTypes.GUILD_CATEGORY).length}
**Text**: ${context.guild?.channels.filter(channel => channel?.type == ChannelTypes.GUILD_TEXT).length}
**Voice**: ${context.guild?.channels.filter(channel => channel?.type == ChannelTypes.GUILD_VOICE).length}
**Announcement**: ${context.guild?.channels.filter(channel => channel?.type == ChannelTypes.GUILD_NEWS_THREAD).length}
**Stage**: ${context.guild?.channels.filter(channel => channel?.type == ChannelTypes.GUILD_STAGE_VOICE).length}
        `, true);

        embed.addField("Emojis and Stickers", `
**Static**: ${context.guild?.emojis.filter(emoji => !emoji?.animated).length}
**Animated**: ${context.guild?.emojis.filter(emoji => emoji?.animated).length}
**Stickers**: ${context.guild?.stickers.length}
        `, true);

        embed.addField("Members", `
**Total**: ${context.guild?.members.length}
**Users**: ${context.guild?.members.filter(member => !member?.bot).length}
**Bots**: ${context.guild?.members.filter(member => member?.bot).length}
        `, true);

        embed.addField("Security", `
**Verification Level**: ${(GuildVerificationLevel as any)[context.guild?.verificationLevel as number]}
**Explicit Content Filter**: ${(GuildExplicitContentFilter as any)[context.guild?.explicitContentFilter as GuildExplicitContentFilterTypes]}
**MFA Requirement**: ${(GuildMfaLevel as any)[context.guild?.mfaLevel as number]}
        `);

        embed.addField("Links", `
**Icon:** ${context.guild?.icon ? `[Link](${context.guild?.iconUrl?.slice(0, -3)}${context.guild?.icon?.startsWith("a_") ? "gif" : "png"}?size=1024)` : "None"}
**Banner:** ${context.guild?.banner ? `[Link](${context.guild?.bannerUrl?.slice(0, -3)}${context.guild?.icon?.startsWith("a_") ? "gif" : "png"}?size=1024)` : "None"}
        `);

        context.editOrRespond({ embeds: [embed] });
    }
}