const Command = require("../../bot/classes/command");
const secrets = require("../../secrets.json");
const statuses = require("../../validations/statuses.json");
const discord = require("discord.js");
const axios = require("axios");

module.exports = new Command({
    data: {
        name: "User Information",
        type: "USER"
    },

    run: async ({ client, interaction }) => {
        let user = await client.users.fetch(interaction.targetId);
        let member = interaction.guild.members.cache.get(interaction.targetId);
        let embed = new discord.MessageEmbed;
        let res = await axios.get(`https://discord.com/api/users/${interaction.targetId}`, {
            headers: {
                Authorization: `Bot ${secrets.discord.token}`
            }
        });

        embed.setTitle(`${user.bot ? "Bot" : "User"} Information`);
        embed.setThumbnail(user.displayAvatarURL({ format: 'png', size: 1024, dynamic: true }));
        embed.addFields(
            {
                name: "Account Profile",
                value:
                    `
**Username:** ${user.username}
**Discriminator:** #${user.discriminator}
**Avatar:** [Default](${user.displayAvatarURL({ format: 'png', size: 1024, dynamic: true })})
**Banner:** ${res.data.banner ? `[Default](https://cdn.discordapp.com/banners/${target.id}/${res.data.banner}.${res.data.banner.startsWith("a_") ? "gif" : "png"}?size=1024)` : res.data.banner_color || "None."}
                    `
            },
            {
                name: "Account Information",
                value:
                    `
**Account ID:** ${user.id}
**Type:** ${user.bot ? "Bot" : "User"}
**Created at:** <t:${Math.ceil(user.createdTimestamp / 1000)}:F>
                    `
            },
            {
                name: "Guild Profile",
                value:
                    `
**Nickname:** ${member.nickname || "No nickname has been set."}
**Roles:** ${member.roles.cache.sort((a, b) => b.position - a.position).filter((role) => role !== interaction.guild.roles.everyone).map((role) => role).join(" ") || `None.`}
**Avatar:** [Member](${member.displayAvatarURL({ format: "png", size: 1024, dynamic: true })})
**Joined at:** <t:${Math.ceil(member.joinedTimestamp / 1000)}:F>
**Boosting status:** ${member.premiumSince ? `Boosting since <t:${Math.ceil(member.premiumSinceTimestamp / 1000)}:F>` : "Not boosting."}
                    `
            },
            {
                name: "Status and Presence",
                value:
                    `
**Status:** ${statuses[member.presence?.status] || statuses["offline"]}
**Custom status:** ${member.presence?.activities[0]?.state || "No custom status has been set."}
                    `
            }
        );

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
});