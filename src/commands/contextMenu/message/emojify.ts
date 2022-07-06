import { Interaction } from "detritus-client";
import { Message } from "detritus-client/lib/structures";

import { emojify } from "../../../utils/functions/commands/Fun/emojify";

import { BaseContextMenuMessageCommand, ContextMenuMessageArgs } from "../../baseCommand";

interface CommandArgs extends ContextMenuMessageArgs {
    message: Message;
}

export default class EmojifyCommand extends BaseContextMenuMessageCommand {
    name = "Emojify";

    async run(context: Interaction.InteractionContext, args: CommandArgs) {
        emojify(context, args.message.content);
    }
}