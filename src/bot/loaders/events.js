const fs = require("fs");
const path = require("path");
const Shade = require("../client");
const Event = require("../classes/event");

module.exports = {
    /** @param {Shade} client */
    async load(client) {
        for (let file of fs.readdirSync("./src/events")) {
            /** @type {Event} */
            let event = await require(`../../events/${file}`);

            client.on(event.name, event.run.bind(null, client));
        }

        console.log("Events loaded.");
    }
};