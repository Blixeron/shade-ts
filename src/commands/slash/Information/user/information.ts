import { Interaction, Structures } from "detritus-client";
import { ApplicationCommandOptionTypes } from 'detritus-client/lib/constants';

import { userInformation } from "../../../../utils/functions/commands/Information/user-information";

import { BaseCommandOption } from "../../../baseCommand";

interface CommandArgs {
    target?: Structures.User | Structures.Member;
}

export class UserInformationCommand extends BaseCommandOption {
    name = "information";
    description = "Check information about a Discord user";

    constructor() {
        super({
            options: [
                {
                    name: "target",
                    description: "Select a target, or ignore to check your own profile",
                    required: false,
                    type: ApplicationCommandOptionTypes.USER
                }
            ]
        });
    }

    async run(context: Interaction.InteractionContext, args: CommandArgs) {
        return userInformation(context, args.target || context.user);
    }
}