import { Interaction, Structures } from "detritus-client";
import { ApplicationCommandOptionTypes, MessageFlags, Permissions } from "detritus-client/lib/constants";

import { BaseSlashCommand } from "../../baseCommand";

export interface CommandArgs {
    target: Structures.Member;
    reason?: string;
}

export default class PingCommand extends BaseSlashCommand {
    name = "kick";
    description = "Kick a member out of the server";

    defaultMemberPermissions = Permissions.KICK_MEMBERS;

    constructor() {
        super({
            options: [
                {
                    name: "target",
                    description: "Select a member to kick",
                    required: true,
                    type: ApplicationCommandOptionTypes.USER
                },
                {
                    name: "reason",
                    description: "Give a reason",
                    required: false,
                    type: ApplicationCommandOptionTypes.STRING
                }
            ]
        });
    }

    async run(context: Interaction.InteractionContext, args: CommandArgs) {
        if (!context.member?.canEdit(args.target)) {
            context.editOrRespond({
                content: `You need a higher role than ${args.target.user.tag} to do this.`,
                flags: MessageFlags.EPHEMERAL,
            });
        } else if (!context.me?.canEdit(args.target)) {
            context.editOrRespond({
                content: `I need a higher role than **${args.target.user.tag}** to do this.`,
                flags: MessageFlags.EPHEMERAL,
            });
        }

        await args.target.remove({ reason: args.reason || "No reason given" });

        context.editOrRespond(`**${args.target.tag}** has been kicked, because "${args.reason || "No reason given"}"`);
    }
}