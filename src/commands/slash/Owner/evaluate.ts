import { Interaction } from "detritus-client";
import { ApplicationCommandOptionTypes, MessageFlags } from 'detritus-client/lib/constants';
import { Embed } from "detritus-client/lib/utils";

import util from "util";

import { BaseSlashCommand } from "../../baseCommand";

interface CommandArgs {
    code: string;
    ephemeral: boolean;
}

export default class EvaluateCommand extends BaseSlashCommand {
    name = "evaluate";
    description = "Evaluate some code";

    metadata = { ownerOnly: true };

    constructor() {
        super({
            options: [
                {
                    name: "code",
                    description: "The code to evaluate",
                    required: true,
                    type: ApplicationCommandOptionTypes.STRING,
                },
                {
                    name: "ephemeral",
                    description: "Whether to send the result as an ephemeral message",
                    required: false,
                    type: ApplicationCommandOptionTypes.BOOLEAN
                }
            ]
        });
    }

    async run(context: Interaction.InteractionContext, args: CommandArgs) {
        const resultEmbed = new Embed;
        const inputEmbed = new Embed;

        inputEmbed.setTitle("Original Expression");
        inputEmbed.setDescription(`\`\`\`js\n${args.code}\`\`\``);

        try {
            const result = util.inspect(eval(args.code));

            if (result.length > 4096) {
                resultEmbed.setTitle("Evaluation Result");
                resultEmbed.setDescription(
                    "```The result length is over 4096 characters, so it cannot be shown.```"
                );
            } else {
                resultEmbed.setTitle("Evaluation Result");
                resultEmbed.setDescription(`\`\`\`js\n${result}\n\`\`\``);
            }
        } catch (error) {
            resultEmbed.setTitle("Evaluation Error");
            resultEmbed.setDescription(`\`\`\`js\n${error}\n\`\`\``);
        }

        context.editOrRespond({ embeds: [inputEmbed, resultEmbed], flags: args.ephemeral ? MessageFlags.EPHEMERAL : 0 });
    }
}