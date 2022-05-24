const fs = require("fs");
const Shade = require("../client");
const Command = require("../classes/command");

module.exports = {
    /** @param {Shade} client */
    async load(client) {
        for (let folder of fs.readdirSync("./src/commands")) {
            let files = fs.readdirSync(`./src/commands/${folder}`);

            client.categories.set(folder, {
                name: folder,
                commands: files.map(file => file.slice(0, -3)),
            });

            for (let file of files) {
                /** @type {Command}*/
                let command = require(`../../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
            }
        }

        console.log("Commands loaded.");
    }
};