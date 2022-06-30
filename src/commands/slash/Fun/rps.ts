import { Interaction, Structures } from "detritus-client";
import { ApplicationCommandOptionTypes } from 'detritus-client/lib/constants';

import { BaseSlashCommand } from "../../baseCommand";

interface CommandArgs {
    choice: string;
}

export const COMMAND_NAME = "rps";

export default class RpsCommand extends BaseSlashCommand<CommandArgs> {
    name = COMMAND_NAME;
    description = "Rock, Paper, Scissors!";

    constructor() {
        super({
            options: [
                {
                    name: "choice",
                    description: "3 rules: Rock beats scissors, scissors beats paper, paper beats rock",
                    required: true,
                    choices: [
                        { name: "Rock", value: "Rock" },
                        { name: "Paper", value: "Paper" },
                        { name: "Scissors", value: "Scissors" }
                    ],
                    type: ApplicationCommandOptionTypes.STRING,
                }
            ]
        });
    }

    async run(context: Interaction.InteractionContext, args: CommandArgs) {
        const choices = ["Rock", "Paper", "Scissors"];
        const myChoice = choices[~~(Math.random() * choices.length)];
        let answer;

        switch (args.choice) {
            case "Rock": {
                switch (myChoice) {
                    case "Rock": { answer = "Tie!"; } break;
                    case "Paper": { answer = "I won!"; } break;
                    case "Scissors": { answer = "You won!"; } break;
                }
            } break;

            case "Paper": {
                switch (myChoice) {
                    case "Rock": { answer = "You won"; } break;
                    case "Paper": { answer = "Tie!"; } break;
                    case "Scissors": { answer = "I won!"; } break;
                }
            } break;

            case "Scissors": {
                switch (myChoice) {
                    case "Rock": { answer = "I won!"; } break;
                    case "Paper": { answer = "You won!"; } break;
                    case "Scissors": { answer = "Tie!"; } break;
                }
            } break;
        }

        return context.editOrRespond(`${args.choice} vs. ${myChoice} - ${answer}`);
    }
}