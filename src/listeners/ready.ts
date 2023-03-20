import { commands } from "..";

import { Listener } from "../structures/listener";

export default new Listener({
    name: "ready",
    run: async (client) => {
        const data = commands.map(command => command.data);

        client.application.commands.set(data);
        await client.application.fetch();

        console.log(`${client.user.tag} is ready.`);
    }
});