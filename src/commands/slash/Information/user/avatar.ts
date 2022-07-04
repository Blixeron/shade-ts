import { Interaction, Structures } from "detritus-client";
import { ApplicationCommandOptionTypes } from 'detritus-client/lib/constants';

import { BaseCommandOption } from "../../../baseCommand";

interface CommandArgs {
    target?: Structures.User | Structures.Member;
    size?: number;
    format?: string;
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
                },
                {
                    name: "size",
                    description: "Select a size, defaults to 1024 pixels",
                    required: false,
                    type: ApplicationCommandOptionTypes.NUMBER,
                    choices: [
                        { name: "128", value: 128 },
                        { name: "256", value: 256 },
                        { name: "512", value: 512 },
                        { name: "1024", value: 1024 },
                        { name: "2048", value: 2048 },
                        { name: "4096", value: 4096 }
                    ]
                },
                {
                    name: "format",
                    description: "Select a format, defaults to png or gif if the avatar is animated",
                    required: false,
                    type: ApplicationCommandOptionTypes.STRING,
                    choices: [
                        { name: "JPG", value: "jpg" },
                        { name: "PNG", value: "png" },
                        { name: "JPEG", value: "jpeg" },
                        { name: "WEBP", value: "webp" },
                        { name: "GIF", value: "gif" }
                    ]
                }
            ]
        });
    }

    async run(context: Interaction.InteractionContext, args: CommandArgs) {
        const target = args.target || context.user;

        context.editOrRespond(`${target.avatarUrl.slice(0, -3)}${args.format ? (args.format == "gif" ? (target.avatar?.startsWith("a_") ? "gif" : "png") : args.format) : target.avatar?.startsWith("a_") ? "gif" : "png"}?size=${args.size || 1024}`);
    }
}