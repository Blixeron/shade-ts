const Command = require("../../main/classes/command");
const package = require("../../../package.json");

module.exports = new Command({
    data: {
        name: "about",
        description: "Get information about me"
    },

    run: async ({ client, interaction }) => {
        const embed = new client.discord.MessageEmbed;
        const row = new client.discord.MessageActionRow;

        row.addComponents(
            new client.discord.MessageButton()
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
> **Users:** ${client.users.cache.filter(user => !user.bot).size}
> **Servers:** ${client.guilds.cache.size}
> **Categories:** ${client.categories.size}
> **Commands:** ${client.commands.size}
                    `,
                inline: true
            },
            {
                name: "Development",
                value:
                    `
> **Developer:** [Blixer](https://twitter.com/BlixerDev)
> **Language:** JavaScript
> **Library:** discord.js${package.dependencies["discord.js"]}
> **Dependencies:** ${Object.keys(package.dependencies).length}
                    `,
                inline: true
            },
            {
                name: "Connection",
                value:
                    `
> **Up since:** <t:${Math.ceil(interaction.client.readyTimestamp / 1000)}:F>
> **Lantency:** ${interaction.client.ws.ping}ms.
                    `
            }
        );

        embed.setFooter({ text: "Thanks to Napo, Willyy and xFrak for testing." });

        return interaction.reply({ embeds: [embed], components: [row] });
    }
});