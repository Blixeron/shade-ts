import { Listener } from "../structures/listener";
import { commands } from "..";
import * as names from "../assets/names.json";

export default new Listener({
    name: "interactionCreate",
    run: async (interaction) => {
        if (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {
            const command = commands.get(interaction.commandName);

            switch (true) {
                case command.ownerOnly && interaction.user != interaction.client.application.owner:
                    interaction.reply({
                        content: "This command can only be used by the bot developer.",
                        ephemeral: true
                    });

                    break;
                case command.botPermissions && !command.botPermissions.every(p => interaction.appPermissions.has(p)):
                    const permissions = command.botPermissions.map(p => names.permissions[p]);

                    return interaction.reply({
                        content: `I need **${permissions.length > 1 ? `${permissions.slice(0, -1).join(', ')} and ${permissions.slice(-1)[0]}` : permissions[0]}** permissions to run this command.`,
                        ephemeral: true
                    });
                default:
                    command.run(interaction);
            }
        }
    }
});