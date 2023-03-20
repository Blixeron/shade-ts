import { CommandInteraction } from "discord.js";

import { Listener } from "../structures/listener";

import { commands } from "..";

export default new Listener({
    name: "interactionCreate",
    run: async (interaction) => {
        if (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {
            const command = commands.get(interaction.commandName);

            await command.run(interaction);
        }
    }
});