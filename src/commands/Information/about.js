const discord = require("discord.js");
const Command = require("../../bot/classes/command");
const package = require("../../../package.json");

module.exports = new Command({
    data: {
        name: "about",
        description: "Check information about me.",
    },

    run: async ({ client, interaction }) => {
        let embed = new discord.MessageEmbed;

        embed.setThumbnail(client.user.avatarURL({ size: 1024, format: "png", dynamic: true }));
        embed.setTitle("Information about me");
        embed.addFields(
            {
                name: "General Information",
                value:
                    `
**Users I'm helping:** ${client.users.cache.filter(user => !user.bot).size}
**Servers I'm on:** ${client.guilds.cache.size}
**Total categories:** ${client.categories.size}
**Total commands:** ${client.commands.size}
                    `
            },
            {
                name: "Development Information",
                value:
                    `
**Developer:** [Blixer](https://twitter.com/BlixerDev)
**Language:** JavaScript <:javascript:979384383641366528>
**Library:** discord.js${package.dependencies["discord.js"]}
**Node:** ${process.version}
**Dependencies:** ${Object.keys(package.dependencies).length}
                    `
            },
            {
                name: "Connection Information",
                value:
                    `
**Up since:** <t:${Math.ceil(interaction.client.readyTimestamp / 1000)}:F>
**Websocket lantency:** ${interaction.client.ws.ping}ms.
                    `
            },
            {
                name: "Big thanks to",
                value: "WillyHeavy, Napo, xFrak and Shawn. I wouldn't be what I am right now without their help."
            },
        );

        return interaction.reply({ embeds: [embed] });
    }
});