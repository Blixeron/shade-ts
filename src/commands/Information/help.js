const Command = require("../../bot/classes/command");
const discord = require("discord.js");
const toCase = require("../../utils/toCase");
const optionTypes = require("../../validations/optionTypes.json");
const permissions = require("../../validations/permissions.json");

module.exports = new Command({
    data: {
        name: "help",
        description: "Get help and more information about how to use my commands.",
        options: [
            {
                name: "command",
                description: "Get help about a specific command.",
                type: "STRING",
                required: false
            }
        ]
    },

    run: async ({ client, interaction }) => {
        let query = interaction.options.getString("command")?.toLowerCase();
        let embed = new discord.MessageEmbed;

        if (!query) {
            embed.setTitle("All commands");
            client.categories.filter(
                category => category.name != "Owner" && category.name != "Context Menu"
            ).map(category => {
                embed.addFields({
                    name: category.name,
                    value: `/${category.commands.map(command => `${command}`).join(", /")}`
                });
            });
            embed.setFooter({ text: "You can use the 'command' option with this command, which will give you more information about a specific command." });

            return interaction.reply({ embeds: [embed] });
        } else {
            let command = client.commands.find(
                command => command.data.name == query
            );

            if (!command) {
                return interaction.reply({
                    content: "There's not a command with that name.",
                    ephemeral: true
                });
            } else {
                embed.setTitle("Command Information");
                embed.setDescription(
                    `
**Name:** ${command.data.name}
**Description:** ${command.data.description}
**Category:** ${client.categories.find(category => category.commands.includes(query)).name}
**Permission required:** ${permissions[command.permission] || "No permission is required to use this command."}
                    `
                );

                if (command.data.options) {
                    let options1 = [];

                    for (let option1 of command.data.options) {
                        let tree1 = {};
                        let tree2 = {};
                        let tree3 = {};
                        let options2 = [];

                        command.data.options.indexOf(option1) < command.data.options.length - 1 ? tree1 = { a: `├`, b: `│` } : tree1 = { a: `└`, b: ` ` };

                        if (option1.options) {
                            for (let option2 of option1.options) {
                                let options3 = [];

                                option1.options.indexOf(option2) < option1.options.length - 1 ? tree2 = { a: `├`, b: `│` } : tree2 = { a: `└`, b: ` ` };

                                if (option2.options) {
                                    for (let option3 of option2.options) {
                                        option2.options.indexOf(option3) < option2.options.length - 1 ? tree3 = { a: `├`, b: `│` } : tree3 = { a: `└`, b: ` ` };

                                        options3.push(`\n${tree1.b}   ${tree2.b}   ${tree3.a}── Name: "${option3.name}"
${tree1.b}   ${tree2.b}   ${tree3.b}   Description: "${option3.description}"
${tree1.b}   ${tree2.b}   ${tree3.b}   Type: ${optionTypes[option3.type]}
${tree1.b}   ${tree2.b}   ${tree3.b}   Required: ${option3.required ? `Yes` : `No`}`);
                                    }
                                }

                                options2.push(`\n${tree1.b}   ${tree2.a}── Name: "${option2.name}"
${tree1.b}   ${tree2.b}   Description: "${option2.description}"
${tree1.b}   ${tree2.b}   Type: ${optionTypes[option2.type]} ${option2.type == `SUB_COMMAND` ? (option2.options ? `\n${tree1.b}   ${tree2.b}   Options: ${options3.join(``)}` : ``) : `\n${tree1.b}   ${tree2.b}   Required: ${option2.required ? `Yes` : `No`}`}`);
                            }
                        }

                        options1.push(`\n${tree1.a}── Name: "${option1.name}"
${tree1.b}   Description: "${option1.description}"
${tree1.b}   Type: ${optionTypes[option1.type]} ${(option1.type == `SUB_COMMAND` || option1.type == `SUB_COMMAND_GROUP`) ? (option1.options ? `\n${tree1.b}   Options: ${options2.join(``)}` : ``) : `\n${tree1.b}   Required: ${option1.required ? `Yes` : `No`}`}`);
                    }

                    let optionsEmbed = new discord.MessageEmbed;

                    optionsEmbed.setTitle("Command Options");
                    optionsEmbed.setDescription(`\`\`\`${options1.join("")}\`\`\``);

                    return interaction.reply({ embeds: [embed, optionsEmbed] });
                }

                return interaction.reply({ embeds: [embed] });
            }
        }
    }
});