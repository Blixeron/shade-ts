const Event = require("../main/classes/event");
const time = Date.now();

module.exports = new Event({
    name: "ready",

    async run(client) {
        const command = client.commands.map(command => command.data);
        await client.guilds.cache.get(client.guild).commands.set(command); // This registers commands in the Development Server
        // await client.application.commands.set(command); // This registers commands globaly

        client.user.setActivity(`how everything turns into dust...`, { type: "WATCHING" });
        return console.log(`\n${client.user.username} is ready!\nLogin time: ${Date.now() - time}ms.`);
    }
});