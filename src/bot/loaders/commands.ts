import fs from "fs";
import path from "path";
import { Shade } from "../client";
import { Command } from "../classes/command";

export default {
    load(client: Shade) {
        // Getting absolute path of the commands folder.
        let commandPath = path.join(__dirname, "..", "..", "commands");
        // Reading the commands main folder and searching for categories.
        fs.readdirSync(commandPath).forEach(async (folder) => {
            for (let file of fs.readdirSync(`${commandPath}/${folder}`)) {
                // Setting categories up in the categories Collection.
                client.categories.set(folder, {
                    name: folder,
                    commands: file
                });

                // Importing commands using the class.
                let command: Command = (await import(`../../commands/${folder}/${file}`)).default;
                // Setting commands up in the commands Collection.
                client.commands.set(command.data.name, command);
            }
        });

        console.log("Loading Commands...");
    }
};