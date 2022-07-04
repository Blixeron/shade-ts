import { Interaction } from "detritus-client";
import { ApplicationCommandOptionTypes, MessageFlags } from 'detritus-client/lib/constants';

import { BaseSlashCommand } from "../../baseCommand";

interface CommandArgs {
    question: string;
}

export default class EightBallCommand extends BaseSlashCommand {
    name = "8ball";
    description = "Ask the magic 8 ball a question";

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

        if (args.question.length > 1900) {
            return context.editOrRespond({
                content: "That's a bit too long for me to answer.",
                flags: MessageFlags.EPHEMERAL
            });
        }

        return context.editOrRespond(`${args.question.endsWith("?") ? args.question : `${args.question}?`}\n${answers[Math.floor(Math.random() * answers.length)]}`);
    }
}