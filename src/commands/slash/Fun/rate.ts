import { Interaction } from "detritus-client";
import { ApplicationCommandOptionTypes, MessageFlags } from 'detritus-client/lib/constants';

import * as emojis from "../../../assets/emojis.json";

import { BaseSlashCommand } from "../../baseCommand";

interface CommandArgs {
    input: string;
}

export default class RateCommand extends BaseSlashCommand {
    name = "rate";
    description = "Rate something based on a scale of 1 to 5";

    constructor() {
        super({
            options: [
                {
                    name: "input",
                    description: "Type in what you want to rate",
                    required: true,
                    type: ApplicationCommandOptionTypes.STRING
                }
            ]
        });
    }

    async run(context: Interaction.InteractionContext, args: CommandArgs) {
        const rate = (~~(Math.random() * 9) + 2) / 2;

        const fullStars = emojis.stars.full.repeat(~~rate);
        const halfStar = rate % 1 ? emojis.stars.half : "";
        const emptyStars = emojis.stars.empty.repeat(~~(5 - rate));

        if (args.input.length > 1900) {
            return context.editOrRespond({
                content: "That's a bit too long for me to rate.",
                flags: MessageFlags.EPHEMERAL
            });
        }

        context.editOrRespond(`I rate ${args.input} ${rate} star${rate != 1 ? "s" : ""}. ${fullStars}${halfStar}${emptyStars}`);
    }
}