import { Interaction } from "detritus-client";
import { ApplicationCommandOptionTypes } from 'detritus-client/lib/constants';

import { BaseSlashCommand } from "../../baseCommand";

import { emojify } from "../../../utils/functions/commands/Fun/emojify";
import { sparklify } from "../../../utils/functions/commands/Fun/sparklify";

interface CommandArgs {
    input: string;
    type: string;
}

export default class RpsCommand extends BaseSlashCommand {
    name = "text";
    description = "Maniuplate text input";

    constructor() {
        super({
            options: [
                {
                    name: "input",
                    description: "The text to manipulate",
                    required: true,
                    type: ApplicationCommandOptionTypes.STRING,
                },
                {
                    name: "type",
                    description: "Select how you want to manipulate the text",
                    required: true,
                    choices: [
                        { name: "Emojify", value: "emojify" },
                        { name: "Reverse", value: "reverse" },
                        { name: "Sparklify", value: "sparklify" }
                    ],
                    type: ApplicationCommandOptionTypes.STRING,
                }
            ]
        });
    }

    async run(context: Interaction.InteractionContext, args: CommandArgs) {
        switch (args.type) {
            case "emojify": {
                return emojify(context, args.input);
            }

            case "reverse": {
                const reversedText = args.input.split("").reverse();

                return context.editOrRespond(`${reversedText.join("")}`.substring(0, 2000));
            }

            case "sparklify": {
                return sparklify(context, args.input);
            }
        }
    }
}