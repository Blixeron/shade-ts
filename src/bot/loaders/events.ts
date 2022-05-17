import fs from "fs";
import path from "path";
import { Event } from "../classes/event";
import { Shade } from "../client";

export default {
    async load(client: Shade) {
        // Getting absolute path of the events folder.
        let eventPath = path.join(__dirname, "..", "..", "events");
        // For-Loop to detect events.
        for (let file of fs.readdirSync(eventPath)) {
            // Importing events using the class.
            let event: Event = (await import(`../../events/${file}`)).default;

            // Setting up the client to run the events code when they're triggered.
            client.on(event.name, event.run.bind(null, client));
        }

        console.log("Loading Events...");
    }
};