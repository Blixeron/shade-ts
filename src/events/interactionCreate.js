const discord = require("discord.js");
const Event = require("../bot/classes/event");
const checking = require("../utils/checking");

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

        if (command.permission) {
            await checking.permissionsAuto(command, interaction);
        } else return command.run({ client, interaction });
    }
});