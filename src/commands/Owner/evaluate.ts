import discord from "discord.js";
import util from "util";
import { Command } from "../../bot/classes/command";

export default new Command({
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
        embed.addFields({ name: "Input", value: `\`\`\`ts\n${code}\`\`\`` });

        try {
            let output = util.inspect(eval(code))
            if (output.length > 4096) {
                replyContent = "Wow, that Output! I can't show it here, as it's length is over 4096 characters.";
            } else {
                replyContent = "Here's the result of your evaluation:";
                embed.setTitle("Output")
                embed.setDescription(`\`\`\`ts\n${output}\`\`\``);
            }
        } catch (error) {
            replyContent = "I tried to evaluate your code, but an error ocurred.";
            embed.setTitle("Output")
            embed.setDescription(`\`\`\`prolog\n${error}\`\`\``);
        }

        interaction.reply({ content: replyContent, embeds: [embed] });
    }
})