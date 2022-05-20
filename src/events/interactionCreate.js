const discord = require("discord.js");
const Event = require("../bot/classes/event");
const permissions = require("../validations/permissions.json");

module.exports = new Event({
    name: "interactionCreate",

    /** @param {discord.CommandInteraction | discord.ContextMenuInteraction} interaction */
    async run(client, interaction) {
        let command = client.commands.find((command) => command.data.name === interaction.commandName);

        if (command.ownerOnly && interaction.user.id !== client.developer) {
            return interaction.reply({
                content: "This command is only for my developer.",
                ephemeral: true
            });
        }

        if (command.permission && !interaction.memberPermissions.has(command.permission)) {
            return interaction.reply({
                content: `You're missing the **${permissions[command.permission]}** permission, which is required to run this command.`,
                ephemeral: true
            });
        }

        let replyContent;
        try {
            return command.run({ client, interaction });
        } catch (error) {
            if (interaction.user.id === client.developer) {
                console.log(error);
                replyContent = "An error occurred while running this command. Check your terminal to see the error log.";
            } else {
                replyContent = "An error occurred while running this command. Contact my developer.";
            }
            return interaction.reply({
                content: replyContent,
                ephemeral: true
            })
        }
    }
});