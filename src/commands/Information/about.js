const discord = require("discord.js");
const Command = require("../../main/classes/command");
const package = require("../../../package.json");

module.exports = new Command({
    data: {
        name: "about",
        description: "Get information about me"
    },

    run: async ({ client, interaction }) => {
        const embed = new client.embed;
        const row = new discord.MessageActionRow;

        row.addComponents(
            new discord.MessageButton()
                .setLabel("GitHub Repository")
                .setStyle("LINK")
                .setURL("https://github.com/BlixerDev/shade")
        );

        embed.setThumbnail(client.user.avatarURL({ size: 1024, format: "png", dynamic: true }));
        embed.setTitle("Information about me");
        embed.addFields(
            {
                name: "Counts",
                value:
                    `
**Users:** ${client.users.cache.filter(user => !user.bot).size}
**Servers:** ${client.guilds.cache.size}
**Categories:** ${client.categories.size}
**Commands:** ${client.commands.size}
                    `,
                inline: true
            },
            {
                name: "Development",
                value:
                    `
**Developer:** [Blixer](https://twitter.com/BlixerDev)
**Language:** JavaScript
**Library:** discord.js${package.dependencies["discord.js"]}
**Dependencies:** ${Object.keys(package.dependencies).length}
                    `,
                inline: true
            },
            {
                name: "Connection",
                value:
                    `
**Up since:** <t:${Math.ceil(interaction.client.readyTimestamp / 1000)}:F>
**Lantency:** ${interaction.client.ws.ping}ms.
                    `
            },
            {
                name: "Thanks",
                value:
                    `
[Napo](https://discord.com/users/759978790734004235), [Willyy](https://discord.com/users/356461130560045067) and [xFrak](https://discord.com/users/517729180054716416) for testing.
                    `
            }
        );

        return interaction.reply({ embeds: [embed], components: [row] });
    }
});