import { GatewayClientEvents } from 'detritus-client';
import { ClientEvents } from 'detritus-client/lib/constants';

export default {
    name: ClientEvents.MESSAGE_CREATE,

    execute(payload: GatewayClientEvents.MessageCreate) {
        if (payload.message.content.match(new RegExp(`^<@!?${payload.message.client.userId}>$`))) {
            payload.message.reply({
                content: `Hello, I'm ${payload.message.client.user!.name}!`
            });
        }
    }
};