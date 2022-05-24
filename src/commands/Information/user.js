const Command = require("../../bot/classes/command");
const discord = require("discord.js")
const axios = require("axios");
const secrets = require("../../secrets.json");

module.exports = new Command({
    data: {
        name: "user",
        description: "Check information about a Discord user.",
        options: [
            {
                name: "target",
                description: "Select who you want to check information about.",
                type: "USER",
                required: false
            }
        ]
    },

    run: async ({ client, interaction }) => {
        let target = interaction.options.getUser("target") || interaction.member.user;
        let user = await client.users.fetch(target.id);
        let member = interaction.guild.members.cache.get(target.id);
        let res = await axios.get(`https://discord.com/api/users/${target.id}`, { headers: { Authorization: `Bot ${secrets.discord.token}` } });
        let embed = new discord.MessageEmbed;

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
**Banner:** ${res.data.banner ? `[Default](https://cdn.discordapp.com/banners/${target.id}/${res.data.banner}.${res.data.banner.startsWith("a_") ? "gif" : "png"}?size=1024)` : res.data.banner_color || "None"}
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
            }
        );

        if (interaction.guild.members.cache.has(target.id)) {
            embed.addFields(
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
                }
            );
        }

        return interaction.reply({ embeds: [embed] });
    }
});