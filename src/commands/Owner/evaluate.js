const discord = require("discord.js");
const util = require("util");
const Command = require("../../bot/classes/command");

module.exports = new Command({
    data: {
        name: "evaluate",
        description: "Evaluate code in JavaScript or TypeScript.",
        options: [
            {
                name: "code",
                description: "Write the code to evaluate.",
                type: "STRING",
                required: true
            }
        ]
    },

    ownerOnly: true,

    run: async ({ interaction }) => {
        let code = interaction.options.getString("code");
        let replyContent;

        let embed = new discord.MessageEmbed;
        embed.addFields({ name: "Input", value: `\`\`\`js\n${code}\`\`\`` });

        try {
            let output = util.inspect(eval(code));
            if (output.length > 4096) {
                replyContent = "Wow, that Output! I can't show it here, as it's length is over 4096 characters.";
            } else {
                replyContent = "Here's the result of your evaluation:";
                embed.setDescription(`\`\`\`js\n${output}\`\`\``);
            }
        } catch (error) {
            replyContent = "I tried to evaluate your code, but an error ocurred.";
            embed.setDescription(`\`\`\`prolog\n${error}\`\`\``);
        }

        return interaction.reply({ content: replyContent, embeds: [embed] });
    }
});