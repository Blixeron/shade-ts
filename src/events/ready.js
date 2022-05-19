const Event = require("../bot/classes/event");

module.exports = new Event({
    name: "ready",

    async run(client) {
        let command = client.commands.map((command) => command.data);
        await client.guilds.cache.get(client.guild).commands.set(command);

        client.user.setActivity(`how everything turns into dust...`, { type: "WATCHING" });
        return console.log(`${client.user.username} is ready!`);
    }
});