import { Interaction, Structures } from "detritus-client";
import { ApplicationCommandOptionTypes } from 'detritus-client/lib/constants';

import axios from "axios";

import { BaseCommandOption } from "../../../baseCommand";

interface CommandArgs {
    target?: Structures.User | Structures.Member;
}

export default class UserAvatarCommand extends BaseCommandOption {
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

        const data = await axios.get(`https://discord.com/api/users/${target.id}`, {
            headers: {
                Authorization: `Bot ${context.client.token}`
            }
        }).then(res => res.data);

        context.editOrRespond(`https://cdn.discordapp.com/avatars/${target.id}/${data.avatar}.${data.avatar?.startsWith("a_") ? "gif" : "png"}?size=1024`);
    }
}