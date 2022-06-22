const util = require("util");
const Command = require("../../main/classes/command");

module.exports = new Command({
    data: {
        name: "evaluate",
        description: "Evaluate a JavaScript expression",
        defaultPermission: false,
        options: [
            {
                name: "expression",
                description: "The expression to evaluate",
                type: "STRING",
                required: true
            },
            {
                name: "ephemeral",
                description: "Whether the result should be sent as an ephemeral message",
                type: "BOOLEAN",
                required: false
            }
        ]
    },

    ownerOnly: true,

    run: async ({ client, interaction }) => {
        const expression = interaction.options.getString("expression");
        const ephemeral = interaction.options.getBoolean("ephemeral");

        const resultEmbed = new client.embed;
        const inputEmbed = new client.embed;

        inputEmbed.setTitle("Original Expression");
        inputEmbed.setDescription(`\`\`\`js\n${expression}\`\`\``);

        try {
            const result = util.inspect(eval(expression));

            if (result.length > 4096) {
                resultEmbed.setTitle("Evaluation Result");
                resultEmbed.setDescription(
                    "```The result length is over 4096 characters, so it cannot be shown.```"
                );
            } else {
                resultEmbed.setTitle("Evaluation Result");
                resultEmbed.setDescription(`\`\`\`js\n${result}\n\`\`\``);
            }

            interaction.reply({ embeds: [inputEmbed, resultEmbed], ephemeral: ephemeral });
        } catch (err) {
            resultEmbed.setTitle("Evaluation Error");
            resultEmbed.setDescription(`\`\`\`js\n${err}\n\`\`\``);
            interaction.reply({ embeds: [inputEmbed, resultEmbed], ephemeral: ephemeral });
        }
    }
});