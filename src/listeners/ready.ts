import { Listener } from '../utils/listener';
import { commands } from '../utils/commands';
import { Logger } from '../utils/logger';

export default new Listener({
    name: 'ready',
    run: async (client) => {
        const data = commands.map(command => command.data);

        client.application.commands.set(data);
        await client.application.fetch();

        Logger.log({
            message: `${Logger.Formatting.cyan}${client.user.tag}${Logger.Formatting.reset} is ready - ID: ${client.user.id}`,
            label: 'READY',
            color: Logger.Formatting.yellow
        });
    }
});