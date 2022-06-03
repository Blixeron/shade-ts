const Command = require("../../bot/classes/command");
const parser = require("twemoji-parser");
const discord = require("discord.js");
const checking = require("../../utils/checking");

module.exports = new Command({
    data: {
        name: "emoji",
        description: "Manage the emojis of this server.",
        options: [
            {
                name: "jumbo",
                description: "Show any emoji as a big image.",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "emoji",
                        description: "Type the emoji.",
                        type: "STRING",
                        required: true
                    }
                ]
            },
            {
                name: "add",
                description: "Add an emoji to this server.",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "file",
                        description: "Send the GIF or image file.",
                        type: "ATTACHMENT",
                        required: true
                    },
                    {
                        name: "name",
                        description: "Type a name for the new emoji.",
                        type: "STRING",
                        required: true
                    }
                ]
            },
            {
                name: "steal",
                description: "Steal an existing emoji from another server.",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "emoji",
                        description: "Type the emoji.",
                        type: "STRING",
                        required: true
                    },
                    {
                        name: "name",
                        description: "Type a name for the stolen emoji.",
                        type: "STRING",
                        required: true
                    }
                ]
            }
        ]
    },

    run: async ({ interaction }) => {
        let emoji = interaction.options.getString("emoji");
        let name = interaction.options.getString("name");

        if (interaction.options.getSubcommand() == "jumbo") {
            let custom = discord.Util.parseEmoji(emoji);
            let image;

            try {
                if (custom.id) {
                    let url = `https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`;
                    image = url;
                } else {
                    let parsed = parser.parse(emoji, { assetType: `png` });
                    image = parsed[0].url;
                };

                interaction.reply(image);
            } catch {
                interaction.reply({ content: "That's not an emoji...", ephemeral: true });
            }
        } else if (interaction.options.getSubcommand() == "steal") {
            let custom = discord.Util.parseEmoji(emoji);

            if (!checking.permissionsManual("MANAGE_EMOJIS_AND_STICKERS", interaction)) {
                try {
                    if (custom.id) {
                        let url = `https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`;
                        await interaction.guild.emojis.create(url, name).then(
                            interaction.reply("You stole the emoji!")
                        );
                    } else {
                        interaction.reply({
                            content: "This isn't a valid custom emoji.",
                            ephemeral: true
                        });
                    }
                } catch {
                    interaction.reply({
                        content: "I couldn't add this emoji to the server. Maybe it reached the maximum amount of emojis.",
                        ephemeral: true
                    });
                }
            }
        }
    }
});