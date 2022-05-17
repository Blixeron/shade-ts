import { Event } from "../bot/classes/event";

export default new Event({
    name: "interactionCreate",

    async run(client, interaction) {
        // Searching for the triggered command.
        let command = client.commands.find((command) => command.data.name === interaction.commandName);

        // Checking if the command is marked as "Owner-Only"
        // and if the user who executed the command, is the Owner of the bot.
        if (command.ownerOnly && interaction.user.id !== client.developer) {
            return interaction.reply({
                content: "This command is only for my developer.",
                ephemeral: true
            })
        }

        // Running the command.
        return command.run({ client, interaction });
    }
});