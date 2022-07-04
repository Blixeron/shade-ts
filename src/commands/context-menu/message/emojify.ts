import { Interaction } from "detritus-client";
import { Message } from "detritus-client/lib/structures";

import * as emojis from "../../../assets/emojis.json";

import { BaseContextMenuMessageCommand, ContextMenuMessageArgs } from "../../baseCommand";

interface CommandArgs extends ContextMenuMessageArgs {
    message: Message;
}

export default class EmojifyCommand extends BaseContextMenuMessageCommand {
    name = "Emojify";

    async run(context: Interaction.InteractionContext, args: CommandArgs) {
        const input = args.message.content.split(" ");
        let count = 0;

        while (count < input.length) {
            count += Math.floor(Math.random() * 5);
            const text = input[count];

            if (text) {
                input[count] = `${text} ${emojis.all[Math.floor(Math.random() * emojis.all.length)]}`;
            }
        }

        return context.editOrRespond(`${input.join(" ")} ${emojis.all[Math.floor(Math.random() * emojis.all.length)]}`.substring(0, 2000));
    }
}