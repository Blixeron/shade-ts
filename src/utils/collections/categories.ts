import { BaseCollection } from "detritus-client/lib/collections";

import fs from "fs";
import path from "path";

const categories = new BaseCollection<string, { name: string, commands: string[]; }>;

for (const folder of fs.readdirSync(path.join(__dirname, "../../commands/slash"))) {
    const files = fs.readdirSync(path.join(__dirname, `../../commands/slash/${folder}`));

    categories.set(folder, {
        name: folder, commands: files.map(file => file.replace(".ts", ""))
    });
}

export default categories;