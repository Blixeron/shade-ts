import { Interaction } from "detritus-client";
import { Message } from "detritus-client/lib/structures";

import { sparklify } from "../../../utils/functions/commands/Fun/sparklify";

import { BaseContextMenuMessageCommand, ContextMenuMessageArgs } from "../../baseCommand";

interface CommandArgs extends ContextMenuMessageArgs {
    message: Message;
}

export default class SparklifyCommand extends BaseContextMenuMessageCommand {
    name = "Sparklify";

    async run(context: Interaction.InteractionContext, args: CommandArgs) {
        sparklify(context, args.message.content);
    }
}