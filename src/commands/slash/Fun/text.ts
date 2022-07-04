import { Interaction } from "detritus-client";
import { ApplicationCommandOptionTypes } from 'detritus-client/lib/constants';

import { BaseSlashCommand } from "../../baseCommand";

import * as emojis from "../../../assets/emojis.json";

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
                const input = args.input.split(" ");
                let count = 0;

                while (count < input.length) {
                    count += Math.floor(Math.random() * 5);
                    const text = input[count];

                    if (text) {
                        input[count] = `${text} ${emojis.all[Math.floor(Math.random() * emojis.all.length)]}`;
                    }
                }

                return context.editOrRespond(`${input.join(" ")} ${emojis.all[Math.floor(Math.random() * emojis.all.length)]}`.substring(0, 2000));
            } break;

            case "reverse": {
                const reversedText = args.input.split("").reverse();

                return context.editOrRespond(`${reversedText.join("")}`.substring(0, 2000));
            } break;

            case "sparklify": {
                const sparklifiedText = args.input.toUpperCase().split("");

                return context.editOrRespond(`✨ ${String(sparklifiedText.join(" ")).substring(0, 1994)} ✨`);
            }
        }
    }
}