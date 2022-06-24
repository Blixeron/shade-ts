const Command = require("../../main/classes/command");
const emojis = require("../../utils/assets/emojis.json");
const letters = require("../../utils/assets/letters.json");

module.exports = new Command({
    data: {
        name: "text",
        description: "Manipulate text input",
        options: [
            {
                name: "input",
                description: "Write the code to manipulate",
                type: "STRING",
                required: true
            },
            {
                name: "type",
                description: "Select how you want to change this text",
                type: "STRING",
                required: true,
                choices: [
                    { name: "Emojify", value: "emojify" },
                    { name: "Flip", value: "flip" }
                ]
            }
        ]
    },

    run: async ({ interaction }) => {
        switch (interaction.options.getString("type")) {
            case "emojify": {
                const input = interaction.options.getString("input").split(" ");
                let count = 0;

                while (count < input.length) {
                    count += Math.floor(Math.random() * 5);
                    const text = input[count];

                    if (text) {
                        input[count] = `${text} ${emojis.all[Math.floor(Math.random() * emojis.all.length)]}`;
                    }
                }

                interaction.reply(`${input.join(" ")} ${emojis.all[Math.floor(Math.random() * emojis.all.length)]}`);
            } break;

            case "flip": {
                const input = interaction.options.getString("input");
                const flippedText = input.split("").map(
                    character => letters.flip[character] || Object.keys(letters.flip).filter(
                        flipped => letters.flip[flipped] == character
                    )[0] || character
                ).reverse();

                interaction.reply(`${flippedText.join("")}`);
            }
        }
    }
});