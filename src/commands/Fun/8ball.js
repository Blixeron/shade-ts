const Command = require("../../main/classes/command");

module.exports = new Command({
    data: {
        name: "8ball",
        description: "Ask the magic 8ball a question",
        options: [
            {
                name: "input",
                description: "The question you want to ask the 8ball",
                type: "STRING",
                required: true
            }
        ]
    },

    run: async ({ client, interaction }) => {
        /** @type {string} */
        const input = interaction.options.getString("input");

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

        return interaction.reply(`${client.discord.Util.escapeBold(input)}${input.endsWith("?") ? "" : "?"}\n**${answers[~~(Math.random() * answers.length)]}**`);
    }
});