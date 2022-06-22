const fs = require("fs");
const Shade = require("../client");
const Command = require("../classes/command");

module.exports = {
    /** @param {Shade} client */
    async load(client) {
        console.log("Loading commands...");

        for (const folder of fs.readdirSync("./src/commands/")) {
            const files = fs.readdirSync(`./src/commands/${folder}`);

            client.categories.set(folder, {
                name: folder,
                commands: files.map(file => file.slice(0, -3)),
            });

            for (const file of files) {
                /** @type {Command}*/
                const command = require(`../../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                console.log(`- ${command.data.name} loaded.`);
            }
        }
    }
};