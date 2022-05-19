const Event = require("../bot/classes/event");

module.exports = new Event({
    name: "interactionCreate",

    async run(client, interaction) {
        let command = client.commands.find((command) => command.data.name === interaction.commandName);

        if (command.ownerOnly && interaction.user.id !== client.developer) {
            return interaction.reply({
                content: "This command is only for my developer.",
                ephemeral: true
            });
        }

        if (command.memberPermissions && !interaction.memberPermissions.has(command.memberPermissions)) {
            return interaction.reply({
                content: `You're missing the ${command.memberPermissions} permission(s), which are required to run this command.`,
                ephemeral: true
            });
        }

        return command.run({ client, interaction });
    }
});