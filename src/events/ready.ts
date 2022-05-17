import { Event } from "../bot/classes/event";

export default new Event({
    name: "ready",

    async run(client) {
        // Registering the commands inside the collection in the Development Server.
        let command = client.commands.map((command) => command.data);
        await client.guilds.cache.get(client.guild).commands.set(command);
        // To register them globaly, use:
        // client.application.commands.set(command);

        console.log(`${client.user.username} is ready!`);
    }
});