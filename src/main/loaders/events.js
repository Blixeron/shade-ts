const fs = require("fs");
const Shade = require("../client");
const Event = require("../classes/event");

module.exports = {
    /** @param {Shade} client */
    async load(client) {
        console.log("\nLoading events...");

        for (const file of fs.readdirSync("./src/events")) {
            /** @type {Event} */
            const event = await require(`../../events/${file}`);
            client.on(event.name, event.run.bind(null, client));
            console.log(`- ${event.name} loaded.`);
        }
    }
};