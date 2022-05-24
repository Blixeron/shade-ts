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

        return command.run({ client, interaction });
    }
});