import { Listener } from '../utils/listener';
import { commands } from '../utils/commands';

export default new Listener({
    name: 'interactionCreate',
    run: async (interaction) => {
        if (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {
            const command = commands.get(interaction.commandName);

            command.run(interaction);
        }
    }
});