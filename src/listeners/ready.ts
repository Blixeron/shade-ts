import { Listener } from '../classes/Listener';
import { Shade } from '../classes/Shade';

export default new Listener({
    name: 'ready',
    run: async (client) => {
        const data = (client as Shade).commands.map(command => command.data);

        client.application.commands.set(data);
        await client.application.fetch();

        console.log(`${client.user.tag} is ready | ID: ${client.user.id}`);
    }
});