import { Listener } from "../structures/listener";
import { commands } from "..";

export default new Listener({
    name: "ready",
    run: async (client) => {
        const data = commands.map(command => command.data);

        client.application.commands.set(data);
        await client.application.fetch();

        console.log(`${client.user.tag} is ready.`);
    }
});