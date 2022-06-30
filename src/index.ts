import { ClusterClient, InteractionCommandClient } from "detritus-client";
import { BaseCollection } from "detritus-client/lib/collections";
import { ActivityTypes, PresenceStatuses } from 'detritus-client/lib/constants';

import fs from "fs";
import path from "path";

import * as config from "./config.json";

const cluster = new ClusterClient(config.token, {
    gateway: {
        loadAllMembers: true,
        intents: "ALL",
        presence: {
            activity: {
                name: "the dust",
                type: ActivityTypes.WATCHING
            },
            status: PresenceStatuses.ONLINE
        }
    }
});

const categories = new BaseCollection<string, { name: string, commands: string[]; }>;

for (const folder of fs.readdirSync(path.join(__dirname, "./commands/slash"))) {
    const files = fs.readdirSync(path.join(__dirname, `./commands/slash/${folder}`));

    categories.set(folder, {
        name: folder, commands: files.map(file => file.slice(0, -3))
    });
}

export default categories;

(async () => {
    await cluster.run();

    const interaction = new InteractionCommandClient(cluster);

    await interaction.addMultipleIn("./commands");
    await interaction.run();

    console.log("Loading listeners...");

    for (const file of fs.readdirSync(path.resolve(__dirname, `./listeners`))) {
        const event = (await import(`./listeners/${file}`)).default;

        cluster.on(event.name, (...args) => event.execute(...args, cluster));
        console.log(`- ${event.name} loaded.`);
    }
})();

process.on("uncaughtException", function (err) {
    console.log("Oops, looks like I had a problem: ", err);
});