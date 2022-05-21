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
            client.categories.map(category => {
                embed.addFields({
                    name: category.name,
                    value: `/${category.commands.map(command => `${command}`).join(", /")}`
                });
            });
            embed.setFooter({ text: "You can use the 'command' option with this command, which will give you more information about a specific command." });

            return interaction.reply({ embeds: [embed] });
        } else {
            let command = client.commands.find(command => command.data.name == query);

            if (!command) {
                return interaction.reply({
                    content: "There's not a command with that name.",
                    ephemeral: true
                });
            } else {
                embed.setTitle(toCase(query));
                embed.addFields(
                    {
                        name: "General Inforamtion",
                        value:
                            `
**Name:** ${command.data.name}
**Description:** ${command.data.description}
**Category:** ${client.categories.find(category => category.commands.includes(query)).name}
                            `
                    },
                    {
                        name: "Command Subcommands",
                        value:
                            `${command.data.options?.filter(
                                option => option.type == "SUB_COMMAND"
                            ).map(
                                subcommand => `**- ${toCase(subcommand.name)}:** ${subcommand.description}\n${subcommand.options?.map(
                                    option => `> **${toCase(option.name)}:** ${option.description} (${optionTypes[option.type]}) ${option.required ? '(Required)' : ''}`
                                ).join("  \n")}`
                            ).join('\n') || "This command doesn't have any subcommands."}`
                    },
                    {
                        name: "Command Options",
                        value:
                            `${command.data.options?.filter(
                                option => option.type != "SUB_COMMAND"
                            ).map(
                                option => `**- ${toCase(option.name)}:** ${option.description} (${optionTypes[option.type]}) ${option.required ? '(Required)' : ''}`
                            ).join('\n') || "This command doesn't have any options."}`
                    }
                );

                return interaction.reply({ embeds: [embed] });
            }
        }
    }
});