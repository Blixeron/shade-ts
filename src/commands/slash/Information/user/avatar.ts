import { Interaction, Structures } from "detritus-client";
import { ApplicationCommandOptionTypes } from 'detritus-client/lib/constants';

import { BaseCommandOption } from "../../../baseCommand";

interface CommandArgs {
    target?: Structures.User | Structures.Member;
}

export class UserAvatarCommand extends BaseCommandOption {
    name = "avatar";
    description = "Check someone's avatar, or your own";

    constructor() {
        super({
            options: [
                {
                    name: "target",
                    description: "Select a target, or ignore to check your own avatar",
                    required: false,
                    type: ApplicationCommandOptionTypes.USER
                }
            ]
        });
    }

    async run(context: Interaction.InteractionContext, args: CommandArgs) {
        const target = args.target || context.user;

        context.editOrRespond(`https://cdn.discordapp.com/avatars/${target.id}/${target.avatar}.${target.avatar?.startsWith("a_") ? "gif" : "png"}?size=1024`);
    }
}