import { ApplicationCommandOptionType, ChatInputCommandInteraction } from "discord.js";
import { Command } from "../../structures/command";

export default new Command({
    data: {
        name: "avatar",
        description: "Show the avatar of someone",
        options: [
            {
                name: "target",
                description: "Who you want to check the avatar of; if not provided, defaults to yourself",
                type: ApplicationCommandOptionType.User
            },
            {
                name: "size",
                description: "Size of the image, defaults to 1024 pixels",
                type: ApplicationCommandOptionType.Integer,
                choices: [
                    { name: "128", value: 128 },
                    { name: "256", value: 256 },
                    { name: "512", value: 512 },
                    { name: "1024", value: 1024 },
                    { name: "2048", value: 2048 },
                    { name: "4096", value: 4096 }
                ]
            },
            {
                name: "format",
                description: "Format of the image, defaults to png or gif if the avatar is animated",
                type: ApplicationCommandOptionType.String,
                choices: [
                    { name: "JPG", value: "jpg" },
                    { name: "JPEG", value: "jpeg" },
                    { name: "PNG", value: "png" },
                    { name: "WEBP", value: "webp" },
                    { name: "GIF, only works if the avatar is actually animated", value: "gif" }
                ]
            },
            {
                name: "server",
                description: "Whether to show the server avatar (if any) or not",
                type: ApplicationCommandOptionType.Boolean
            }
        ]
    },

    run: async (interaction: ChatInputCommandInteraction) => {
        // WIP
    }
});