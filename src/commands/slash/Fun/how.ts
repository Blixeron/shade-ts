import { Interaction } from "detritus-client";
import { ApplicationCommandOptionTypes, MessageFlags } from 'detritus-client/lib/constants';

import { BaseSlashCommand } from "../../baseCommand";

interface CommandArgs {
    input: string;
    target?: string;
}

export default class RateCommand extends BaseSlashCommand {
    name = "how";
    description = "Calculate how much of anything is someone or something";

    constructor() {
        super({
            options: [
                {
                    name: "target",
                    description: "Type in what or who you want to calculate the percentage of",
                    required: true,
                    type: ApplicationCommandOptionTypes.STRING
                },
                {
                    name: "input",
                    description: "Type in what you want to calculate",
                    required: true,
                    type: ApplicationCommandOptionTypes.STRING
                }
            ]
        });
    }

    async run(context: Interaction.InteractionContext, args: CommandArgs) {
        const percentage = ~~(Math.random() * 101);

        context.editOrRespond(`${args.target} is ${percentage}% ${args.input}.`);
    }
}