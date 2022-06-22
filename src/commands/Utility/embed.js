const discord = require("discord.js");
const Command = require("../../main/classes/command");

module.exports = new Command({
    data: {
        name: "embed",
        description: "Send embed messages",
        options: [
            {
                name: "channel",
                description: "The channel to send the message in",
                type: "CHANNEL"
            }
        ]
    },

    permission: "EMBED_LINKS",

    run: async ({ interaction }) => {
        /** @type {discord.GuildChannel} */
        const channel = interaction.options.getChannel("channel") || interaction.channel;
        const modal = new discord.Modal()
            .setCustomId("embedBuilder")
            .setTitle("Embed Builder");

        const title = new discord.TextInputComponent()
            .setCustomId("title")
            .setLabel("Title")
            .setPlaceholder("Write the title of the embed")
            .setStyle("SHORT")
            .setMaxLength(256);
        const description = new discord.TextInputComponent()
            .setCustomId("description")
            .setLabel("Description")
            .setPlaceholder("Write a description for your embed here")
            .setStyle("PARAGRAPH")
            .setRequired(true);
        const color = new discord.TextInputComponent()
            .setCustomId("color")
            .setLabel("Color")
            .setPlaceholder("Write the hexadecimal color for the embed, don't include the #")
            .setStyle("SHORT")
            .setMaxLength(6);

        const firstRow = new discord.MessageActionRow()
            .setComponents(title);
        const secondRow = new discord.MessageActionRow()
            .setComponents(description);
        const thirdRow = new discord.MessageActionRow()
            .setComponents(color);

        modal.addComponents(firstRow, secondRow, thirdRow);

        await interaction.showModal(modal);

        interaction.awaitModalSubmit({ time: 20_000_000 }).then(interaction => {
            if (interaction.customId == "embedBuilder") {
                const embed = new discord.MessageEmbed()
                    .setTitle(interaction.fields.getTextInputValue("title"))
                    .setDescription(interaction.fields.getTextInputValue("description"));

                interaction.guild.channels.fetch(channel.id).then(channel => {
                    if (interaction.guild.me.permissionsIn(channel).has("SEND_MESSAGES" && "EMBED_LINKS")) {
                        try {
                            channel.send({ embeds: [embed] });
                            interaction.reply({
                                content: `The embed has been sent into <#${channel.id}>`,
                                ephemeral: true
                            });
                        } catch {
                            interaction.reply({
                                content: `An error occurred while sending the embed.`,
                                ephemeral: true
                            });
                        }
                    } else {
                        interaction.reply({
                            content: "I don't have permission to send embeds in this channel.",
                            ephemeral: true
                        });
                    }
                });
            }
        }).catch(() => { });
    }
});