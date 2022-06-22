const Command = require("../../main/classes/command");
const optionTypes = require("../../utils/validations/optionTypes.json");
const permissions = require("../../utils/validations/permissions.json");

module.exports = new Command({
    data: {
        name: "help",
        description: "Get help about my commands",
        options: [
            {
                name: "all",
                description: "Show a list of all commands",
                type: "SUB_COMMAND"
            },
            {
                name: "single",
                description: "Show information for a single command",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "command",
                        description: "The command to get information of",
                        type: "STRING",
                        required: true
                    }
                ]
            }
        ]
    },

    run: async ({ client, interaction }) => {
        const embed = new client.discord.MessageEmbed;

        switch (interaction.options.getSubcommand()) {
            case "all": {
                embed.setTitle("Commands List");

                client.categories.filter(
                    category => category.name != "Owner"
                ).map(category => {
                    embed.addFields({
                        name: category.name,
                        value: category.commands.map(command => command).join(", ")
                    });
                });

                return interaction.reply({ embeds: [embed] });
            }
            case "single": {
                const query = interaction.options.getString("command");
                const command = client.commands.get(query);

                if (!command || command.ownerOnly && interaction.user.id != client.developer) {
                    return interaction.reply({
                        content: "No command with that name was found.",
                        ephemeral: true
                    });
                } else {
                    embed.setTitle("Command Information");
                    embed.setDescription(
                        `
**Name:** ${command.data.name}
**Description:** ${command.data.description}
**Category:** ${client.categories.find(category => category.commands.includes(query)).name}
**Permission required:** ${permissions[command.permission] || "None"}
                    `
                    );

                    if (command.data.options) {
                        const options1 = [];

                        for (const option1 of command.data.options) {
                            let tree1 = {};
                            let tree2 = {};
                            let tree3 = {};
                            const options2 = [];

                            command.data.options.indexOf(option1) < command.data.options.length - 1 ? tree1 = { a: `├`, b: `│` } : tree1 = { a: `└`, b: ` ` };

                            if (option1.options) {
                                for (const option2 of option1.options) {
                                    const options3 = [];

                                    option1.options.indexOf(option2) < option1.options.length - 1 ? tree2 = { a: `├`, b: `│` } : tree2 = { a: `└`, b: ` ` };

                                    if (option2.options) {
                                        for (const option3 of option2.options) {
                                            option2.options.indexOf(option3) < option2.options.length - 1 ? tree3 = { a: `├`, b: `│` } : tree3 = { a: `└`, b: ` ` };

                                            options3.push(`\n${tree1.b}   ${tree2.b}   ${tree3.a}── Name: "${option3.name}"
${tree1.b}   ${tree2.b}   ${tree3.b}   Description: "${option3.description}"
${tree1.b}   ${tree2.b}   ${tree3.b}   Type: ${optionTypes[option3.type]}
${tree1.b}   ${tree2.b}   ${tree3.b}   Required: ${option3.required ? "Yes" : "No"}`);
                                        }
                                    }

                                    options2.push(`\n${tree1.b}   ${tree2.a}── Name: "${option2.name}"
${tree1.b}   ${tree2.b}   Description: "${option2.description}"
${tree1.b}   ${tree2.b}   Type: ${optionTypes[option2.type]} ${option2.type == `SUB_COMMAND` ? (option2.options ? `\n${tree1.b}   ${tree2.b}   Options: ${options3.join("")}` : ``) : `\n${tree1.b}   ${tree2.b}   Required: ${option2.required ? `Yes` : `No`}`}`);
                                }
                            }

                            options1.push(`\n${tree1.a}── Name: "${option1.name}"
${tree1.b}   Description: "${option1.description}"
${tree1.b}   Type: ${optionTypes[option1.type]} ${(option1.type == `SUB_COMMAND` || option1.type == `SUB_COMMAND_GROUP`) ? (option1.options ? `\n${tree1.b}   Options: ${options2.join(``)}` : ``) : `\n${tree1.b}   Required: ${option1.required ? `Yes` : `No`}`}`);
                        }

                        const optionsEmbed = new client.discord.MessageEmbed;

                        optionsEmbed.setTitle("Command Options");
                        optionsEmbed.setDescription(`\`\`\`${options1.join("")}\`\`\``);

                        return interaction.reply({ embeds: [embed, optionsEmbed] });
                    }

                    return interaction.reply({ embeds: [embed] });
                }
            }
        }
    }
});