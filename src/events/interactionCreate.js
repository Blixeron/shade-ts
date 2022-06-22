const discord = require("discord.js");
const Event = require("../main/classes/event");

module.exports = new Event({
    name: "interactionCreate",

    /** @param {discord.CommandInteraction | discord.ContextMenuInteraction} interaction */
    async run(client, interaction) {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (command.ownerOnly && interaction.user.id != client.developer) {
                return interaction.reply({
                    content: "This command is only for my developer.",
                    ephemeral: true
                });
            }

            if (command.guildOnly && interaction.guild == null) {
                return interaction.reply({
                    content: "This command can only be used in a server.",
                    ephemeral: true
                });
            }

            if (!client.check.permissionsAuto(command, interaction)) {
                return command.run({ client, interaction });
            }
        }
    }
});