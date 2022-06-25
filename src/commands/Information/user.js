const fetch = require("node-fetch").default;
const Command = require("../../main/classes/command");
const emojis = require("../../utils/assets/emojis.json");
const flags = require("../../utils/validations/flags.json");

module.exports = new Command({
    data: {
        name: "user",
        description: "Check information about a Discord user",
        options: [
            {
                name: "target",
                description: "Select a target, or ignore to check your own profile",
                type: "USER",
                required: false
            }
        ]
    },

    run: async ({ client, interaction }) => {
        const target = interaction.options.getUser("target") || interaction.user;
        const data = await fetch(`https://discord.com/api/users/${target.id}`, {
            headers: {
                Authorization: `Bot ${client.secrets.discord.token}`
            }
        }).then(data => data.json());

        const embed = new client.discord.MessageEmbed;

        embed.setTitle(`${target.tag}`);
        embed.setThumbnail(target.displayAvatarURL({ size: 512, dynamic: true }));
        embed.setImage(`https://cdn.discordapp.com/banners/${target.id}/${data.banner}.${data.banner?.startsWith("a_") ? "gif" : "png"}?size=1024`);
        embed.addFields(
            {
                name: "Default",
                value:
                    `
> **ID:** ${target.id}
> **Type:** ${target.bot ? "Bot" : "User"}
> **Flags:** ${target.flags.toArray().map(flag => flags[flag]).join(", ") || "None"}
> **Created at:** <t:${Math.ceil(target.createdTimestamp / 1000)}>
                    `,
                inline: true
            }
        );

        if (interaction.guild != null && interaction.guild.members.cache.has(target.id)) {
            const member = interaction.guild.members.cache.get(target.id);

            embed.addFields(
                {
                    name: "Server",
                    value:
                        `
> **Nick:** ${member.nickname ? member.nickname.includes("`") ? client.discord.Util.escapeMarkdown(member.nickname) : member.nickname : "None"} 
> **Roles:** ${member.roles.cache.sort((a, b) => b.position - a.position).filter(role => role != interaction.guild.roles.everyone).map(role => role).join(" ") || `None`}
> **Boosting:** ${member.premiumSince ? `Since <t:${Math.ceil(target.premiumSinceTimestamp / 1000)}:F>` : "No"}
> **Joined at:** <t:${Math.ceil(member.joinedTimestamp / 1000)}:F>
                        `,
                    inline: true
                },
                {
                    name: "Status",
                    value:
                        `
> **Status:** ${emojis.statuses[member.presence?.status] || emojis.statuses["offline"]}
> **Custom status:** ${member.presence?.activities[0]?.state || "None"}
                        `
                }
            );
        }

        embed.addFields({
            name: "Links",
            value:
                `
> **Avatar:** [Default](https://cdn.discordapp.com/avatars/${target.id}/${data.avatar}.${data.avatar?.startsWith("a_") ? "gif" : "png"}?size=1024)
> **Banner:** ${data.banner ? `[Default](https://cdn.discordapp.com/banners/${target.id}/${data.banner}.${data.banner?.startsWith("a_" ? "gif" : "png")}?size=1024)` : `No custom banner, color is ${data.banner_color}`}
                `
        });

        interaction.reply({ embeds: [embed] });
    }
});