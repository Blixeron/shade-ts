const fetch = require("node-fetch").default;
const Command = require("../../main/classes/command");
const serverSecurity = require("../../utils/validations/serverSecurity.json");

module.exports = new Command({
    data: {
        name: "server",
        description: "Check information about this server"
    },

    guildOnly: true,

    run: async ({ client, interaction }) => {
        const embed = new client.discord.MessageEmbed;

        let roles = interaction.guild.roles.cache.sort((a, b) =>
            b.position - a.position).filter(role =>
                role !== interaction.guild.roles.everyone).map(role => role) || "None.";

        if (roles.length > 35) roles = "Too many roles here!";
        else roles = roles.join(" ");


        const data = await fetch(`https://discord.com/api/v10/guilds/${interaction.guild.id}`, {
            headers: {
                Authorization: `Bot ${client.secrets.discord.token}`
            }
        }).then(data => data.json());

        embed.setTitle(interaction.guild.name);
        embed.setDescription(interaction.guild.description);
        embed.setThumbnail(interaction.guild.iconURL({ size: 1024, dynamic: true }));
        embed.setImage(interaction.guild.bannerURL({ size: 1024 }));
        embed.addFields(
            {
                name: "General",
                value:
                    `
**ID**: ${interaction.guild.id}
**Owner:** <@${interaction.guild.ownerId}>
**Created at:** <t:${Math.ceil(interaction.guild.createdTimestamp / 1000)}>
                    `
            },
            {
                name: `Roles (${interaction.guild.roles.cache.size})`,
                value:
                    `
${roles}
                    `,
                inline: true
            },
            {
                name: "Counts",
                value:
                    `
**Channels**
├── Text: ${interaction.guild.channels.cache.filter(c => c.type == 'GUILD_TEXT').size}
├── Voice: ${interaction.guild.channels.cache.filter(c => c.type == 'GUILD_VOICE').size}
├── Announcement: ${interaction.guild.channels.cache.filter(c => c.type == 'GUILD_NEWS').size}
└── Stage: ${interaction.guild.channels.cache.filter(c => c.type == 'GUILD_STAGE_VOICE').size}
**Emojis and Stickers**
├── Static: ${interaction.guild.emojis.cache.filter((emoji) => !emoji.animated).size}
├── Animated: ${interaction.guild.emojis.cache.filter((emoji) => emoji.animated).size}
└── Stickers: ${interaction.guild.stickers.cache.size}
**Other**
├── Humans: ${interaction.guild.members.cache.filter(member => !member.user.bot).size}
├── Bots: ${interaction.guild.members.cache.filter(member => member.user.bot).size}
└── Boosts: ${interaction.guild.premiumSubscriptionCount}
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
            },
        );

        interaction.reply({ embeds: [embed] });
    }
});