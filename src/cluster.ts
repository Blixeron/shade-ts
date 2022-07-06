import { ClusterClient, InteractionCommandClient } from "detritus-client";
import { ActivityTypes, GatewayIntents } from "detritus-client/lib/constants";

import fs from "fs";
import path from "path";

import * as config from "./config.json";

export class ShadeCluster extends ClusterClient {
    constructor() {
        super(config.token, {
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
                    status: "online"
                }
            }
        });
    }

    public async start() {
        await this.run();

        const interaction = new InteractionCommandClient(this);

        await interaction.addMultipleIn("./commands");
        await interaction.run();

        console.log("Loading listeners...");

        for (const file of fs.readdirSync(path.resolve(__dirname, `./listeners`))) {
            const event = (await import(`./listeners/${file}`)).default;

            this.on(event.name, (...args) => event.execute(...args, this));
            console.log(`- ${event.name} loaded.`);
        }
    }
}