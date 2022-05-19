const fs = require("fs");
const path = require("path");
const Shade = require("../client");
const Command = require("../classes/command");

module.exports = {
    /** @param {Shade} client */
    async load(client) {
        let commandPath = path.join(__dirname, "..", "..", "commands");

        fs.readdirSync(commandPath).forEach(async (folder) => {
            for (let file of fs.readdirSync(`${commandPath}/${folder}`)) {
                client.categories.set(folder, {
                    name: folder,
                    commands: file
                });

                /** @type {Command}*/
                let command = await require(`../../commands/${folder}/${file}`);

                client.commands.set(command.data.name, command);

                module.exports = command;
            }
        });

        console.log("Commands loaded.");
    }
}