import { ClusterClient, InteractionCommandClient } from "detritus-client";
import { ActivityTypes, GatewayIntents, PresenceStatuses } from 'detritus-client/lib/constants';

import fs from "fs";
import path from "path";

import * as config from "./config.json";

const cluster = new ClusterClient(config.token, {
    gateway: {
        loadAllMembers: true,
        intents: [
            GatewayIntents.GUILDS,
            GatewayIntents.GUILD_MEMBERS,
            GatewayIntents.GUILD_PRESENCES
        ],
        presence: {
            activity: {
                name: "for /help",
                type: ActivityTypes.WATCHING
            },
            status: PresenceStatuses.ONLINE
        }
    }
});

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
