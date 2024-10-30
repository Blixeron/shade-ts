import { Listener } from '../classes/Listener';
import { Shade } from '../classes/Shade';

export default new Listener({
    name: 'interactionCreate',
    run: async (interaction) => {
        if (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {
            const command = (interaction.client as Shade).commands.get(interaction.commandName);

            command.run(interaction);
        }
    }
})