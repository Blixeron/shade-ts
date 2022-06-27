const Command = require("../../main/classes/command");
const emojis = require("../../utils/assets/emojis.json");

module.exports = new Command({
    data: {
        name: "Emojify",
        type: "MESSAGE"
    },

    run: async ({ interaction }) => {
        const message = await interaction.channel.messages.fetch(interaction.targetId);
        const input = message.content.split(" ");
        let count = 0;

        while (count < input.length) {
            count += Math.floor(Math.random() * 5);
            const text = input[count];

            if (text) {
                input[count] = `${text} ${emojis.all[Math.floor(Math.random() * emojis.all.length)]}`;
            }
        }

        return interaction.reply(`${input.join(" ")} ${emojis.all[Math.floor(Math.random() * emojis.all.length)]}`.substring(0, 2000));
    }
});