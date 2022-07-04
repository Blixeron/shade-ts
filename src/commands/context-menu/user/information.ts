import { Interaction, Structures } from "detritus-client";

import { userInformation } from "../../../utils/functions/commands/Information/user-information";

import { BaseContextMenuUserCommand, ContextMenuUserArgs } from "../../baseCommand";

interface CommandArgs extends ContextMenuUserArgs {
    user: Structures.User | Structures.Member;
}

export default class UserInformationCommand extends BaseContextMenuUserCommand {
    name = "Information";

    async run(context: Interaction.InteractionContext, args: CommandArgs) {
        userInformation(context, args.user, true);
    }
}