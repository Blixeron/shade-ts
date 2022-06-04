const Command = require("../../bot/classes/command");

module.exports = new Command({
    data: {
        name: "rps",
        description: "Rock, Paper, Scissors!",
        options: [
            {
                name: "choice",
                description: "3 rules: Rock beats Scissors, Paper beats Rock, and Scissors beats Paper.",
                type: "STRING",
                choices: [
                    { name: "Rock", value: "Rock" },
                    { name: "Paper", value: "Paper" },
                    { name: "Scissors", value: "Scissors" }
                ],
                required: true
            }
        ]
    },

    run: async ({ interaction }) => {
        let userChoice = interaction.options.getString("choice");
        let choices = ["Rock", "Paper", "Scissors"];
        let myChoice = choices[~~(Math.random() * choices.length)];
        let answer;

        switch (userChoice) {
            case "Rock": {
                switch (myChoice) {
                    case "Rock": { answer = "**Tie!**"; } break;
                    case "Paper": { answer = "**I won!**"; } break;
                    case "Scissors": { answer = "**You won!**"; } break;
                }
            } break;

            case "Paper": {
                switch (myChoice) {
                    case "Rock": { answer = "**You won**"; } break;
                    case "Paper": { answer = "**Tie**"; } break;
                    case "Scissors": { answer = "**I won!**"; } break;
                }
            } break;

            case "Scissors": {
                switch (myChoice) {
                    case "Rock": { answer = "**I won!**"; } break;
                    case "Paper": { answer = "**You won!**"; } break;
                    case "Scissors": { answer = "**Tie**"; } break;
                }
            } break;
        }

        return interaction.reply(`${userChoice} vs. ${myChoice}\n${answer}`);
    }
});