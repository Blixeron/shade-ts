const Event = require("../main/classes/event");
const time = Date.now();

module.exports = new Event({
    name: "ready",

    async run(client) {
        const commands = client.commands.map(command => command.data);
        await client.guilds.cache.get(client.guild).commands.set(commands);
        await client.application.commands.set(commands);

        client.user.setActivity(`how everything turns into dust...`, { type: "WATCHING" });
        return console.log(`\n${client.user.username} is ready!\nLogin time: ${Date.now() - time}ms.`);
    }
});