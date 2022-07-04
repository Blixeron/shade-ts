import { Interaction } from "detritus-client";
import { MessageFlags } from "detritus-client/lib/constants";
import * as emojis from "../../../../assets/emojis.json";

export function emojify(context: Interaction.InteractionContext, text: string, ephemeral?: boolean): Promise<any> {
    const input = text.split(" ");
    let count = 0;

    while (count < input.length) {
        count += Math.floor(Math.random() * 5);
        const text = input[count];

        if (text) {
            input[count] = `${text} ${emojis.all[Math.floor(Math.random() * emojis.all.length)]}`;
        }
    }

    return context.editOrRespond({
        content: `${input.join(" ")} ${emojis.all[Math.floor(Math.random() * emojis.all.length)]}`.substring(0, 2000),
        flags: ephemeral ? MessageFlags.EPHEMERAL : 0
    });
}