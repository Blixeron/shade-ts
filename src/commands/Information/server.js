const Command = require("../../bot/classes/command");
const serverSecurity = require("../../validations/serverSecurity.json");
const discord = require("discord.js");
const axios = require("axios");
const secrets = require("../../secrets.json");

module.exports = new Command({
    data: {
        name: "server",
        description: "Check information about this server.",
    },

    run: async ({ interaction }) => {
        let embed = new discord.MessageEmbed;
        let roles = interaction.guild.roles.cache.sort(
            (a, b) => b.position - a.position
        ).filter(
            (role) => role !== interaction.guild.roles.everyone
        ).map(
            (role) => role
        ) || `None.`;

        if (roles.length > 35) {
            roles = "Too many roles here!";
        } else {
            roles = roles.join(" ");
        }

        let res = await axios.get(`https://discord.com/api/v9/guilds/${interaction.guild.id}`, {
            headers: {
                Authorization: `Bot ${secrets.discord.token}`
            }
        });

        embed.setTitle("Server Information");
        embed.setThumbnail(interaction.guild.iconURL({ size: 1024, format: "png", dynamic: true }));
        embed.addFields(
            {
                name: "General Information",
                value:
                    `
**Name:** ${interaction.guild.name}
**ID:** ${interaction.guild.id}
**Description:** ${interaction.guild.description || "None."}
**Created at:** <t:${Math.ceil(interaction.guild.createdTimestamp / 1000)}>
**Owner:** <@${interaction.guild.ownerId}>
**Icon:** ${res.data.icon ? `[URL](https://cdn.discordapp.com/icons/${interaction.guild.id}/${res.data.icon}.${res.data.icon.startsWith("a_") ? "gif" : "png"}?size=1024)` : "None."}
**Banner:** ${res.data.banner ? `[URL](https://cdn.discordapp.com/banners/${message.guild.id}/${data.banner}.${data.banner.startsWith("a_") ? "gif" : "png"}?size=1024)` : "None."}
                    `,
            },
            {
                name: "Roles",
                value:
                    `
**Total:** ${interaction.guild.roles.cache.size}
**Highest:** ${interaction.guild.roles.highest}
**All:** ${roles}
                    `
            },
            {
                name: "Channels",
                value:
                    `
**Text:** ${interaction.guild.channels.cache.filter(c => c.type == 'GUILD_TEXT').size}
**Voice:** ${interaction.guild.channels.cache.filter(c => c.type == 'GUILD_VOICE').size}
**Announcement:** ${interaction.guild.channels.cache.filter(c => c.type == 'GUILD_NEWS').size}
**Stage:** ${interaction.guild.channels.cache.filter(c => c.type == 'GUILD_STAGE_VOICE').size}
                    `,
                inline: true
            },
            {
                name: "Emojis and Stickers",
                value:
                    `
**Static emojis:** ${interaction.guild.emojis.cache.filter((emoji) => !emoji.animated).size}
**Animated emojis:** ${interaction.guild.emojis.cache.filter((emoji) => emoji.animated).size}
**Sticker count:** ${interaction.guild.stickers.cache.size}
                    `,
                inline: true
            },
            {
                name: "Other",
                value:
                    `
**Members:** ${interaction.guild.memberCount}
**Boosts:** ${interaction.guild.premiumSubscriptionCount}
**Maximum members:** ${interaction.guild.maximumMembers}
                    `,
                inline: true
            },
            {
                name: "Security",
                value:
                    `
**Verification Level:** ${serverSecurity.verification_level[interaction.guild.verificationLevel]}
**Explicit content filter:** ${serverSecurity.explicit_content_filter[interaction.guild.explicitContentFilter]}
**MFA Requirement:** ${serverSecurity.mfa_level[interaction.guild.mfaLevel]}
                    `,
                inline: true
            },
            {
                name: "Features",
                value: `\`\`\`${interaction.guild.features.join(``) ? `${interaction.guild.features.join(`\n`)}` : `No features are enabled or unlocked in this guild.`}\`\`\``
            }
        );

        return interaction.reply({ embeds: [embed] });
    }
});