import { Listener } from '../classes/Listener';
import { Shade } from '../classes/Shade';
import { Logger } from '../utils/Logger';

export default new Listener({
    name: 'ready',
    run: async (client) => {
        const data = (client as Shade).commands.map(command => command.data);

        client.application.commands.set(data);
        await client.application.fetch();

        Logger.print({
            message: `${Logger.format(client.user.tag, 'cyan')} is ready` +
                ` | ID: ${Logger.format(client.user.id, 'cyan')}`,
            label: Logger.format('READY', 'yellow')
        });
    }
});