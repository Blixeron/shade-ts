import { Interaction } from "detritus-client";
import { ApplicationCommandOptionTypes } from 'detritus-client/lib/constants';

import { BaseSlashCommand } from "../../baseCommand";

interface CommandArgs {
    question: string;
}

export const COMMAND_NAME = "8ball";

export default class EightBallCommand extends BaseSlashCommand<CommandArgs> {
    name = COMMAND_NAME;
    description = "Ask the magic 8 ball a question";

    metadata = { category: "Fun" };

    constructor() {
        super({
            options: [
                {
                    name: "question",
                    description: "Ask something",
                    required: true,
                    type: ApplicationCommandOptionTypes.STRING,
                }
            ]
        });
    }

    async run(context: Interaction.InteractionContext, args: CommandArgs) {
        const answers = [
            "It is certain.", "It is decidedly so.", "Without a doubt.",
            "Yes - definitely.", "You may rely on it.", "As I see it, yes.",
            "Most likely.", "I don't think so.", "It is decidedly not.",
            "Outlook not so good.", "Yes.", "No.",
            "Take this 🛏️, so you can keep dreaming.", "Yeah... no.", "Bruh.",
            "Signs point to yes.", "Reply hazy, try again.", "Ask again later.",
            "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.",
            "Don't count on it.", "My sources say no.", "Of course.",
            "Outlook good.", "Don't bet on it.", "Yes, definitely.",
            "My reply is no.", "I don't know.", "I don't care.",
            "What the hell is this question?", "Are you seriously asking this?", "I'm not sure.",
            "✨ Y E S ✨", "✨ N O ✨", "✨ I D K ✨"
        ];

        return context.editOrRespond(`${(args.question.endsWith("?") ? args.question : `${args.question}?`).substring(0, 1900)}\n${answers[Math.floor(Math.random() * answers.length)]}`);
    }
}