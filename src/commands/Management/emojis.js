const parser = require("twemoji-parser");
const Command = require("../../main/classes/command");

module.exports = new Command({
    data: {
        name: "emojis",
        description: "Manage the emojis of this server",
        options: [
            {
                name: "jumbo",
                description: "Show any emoji as a big image",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "emoji",
                        description: "Type the emoji",
                        type: "STRING",
                        required: true
                    }
                ]
            },
            {
                name: "steal",
                description: "Steal an existing emoji from another server",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "emoji",
                        description: "Type the emoji",
                        type: "STRING",
                        required: true
                    },
                    {
                        name: "name",
                        description: "Type a name for the stolen emoji",
                        type: "STRING",
                        required: true
                    }
                ]
            }
        ]
    },

    run: async ({ client, interaction }) => {
        const emoji = interaction.options.getString("emoji");

        switch (interaction.options.getSubcommand()) {
            case "jumbo": {
                const custom = client.discord.Util.parseEmoji(emoji);
                let image;

                try {
                    if (custom.id) {
                        const url = `https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`;
                        image = url;
                    } else {
                        const parsed = parser.parse(emoji, { assetType: `png` });
                        image = parsed[0].url;
                    };

                    return interaction.reply(image);
                } catch {
                    return interaction.reply({ content: "That's not an emoji...", ephemeral: true });
                }
            } break;

            case "steal": {
                const name = interaction.options.getString("name").replace(" ", "_");
                const custom = client.discord.Util.parseEmoji(emoji);

                if (!client.check.permissionsManual("MANAGE_EMOJIS_AND_STICKERS", interaction)) {
                    try {
                        if (custom.id) {
                            const url = `https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`;
                            await interaction.guild.emojis.create(url, name).then(
                                interaction.reply("You stole the emoji!")
                            );
                        } else {
                            return interaction.reply({
                                content: "This isn't a valid custom emoji.",
                                ephemeral: true
                            });
                        }
                    } catch {
                        return interaction.reply({
                            content: "I couldn't add this emoji to the server. Maybe it reached the maximum amount of emojis.",
                            ephemeral: true
                        });
                    }
                }
            }
        }
    }
});