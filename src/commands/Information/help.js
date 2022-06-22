const discord = require("discord.js");
const Command = require("../../main/classes/command");

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
        const embed = new client.embed;

        switch (interaction.options.getSubcommand()) {
            case "all": {
                embed.setTitle("Commands List");

                client.categories.map(category => {
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

                if (!command) {
                    return interaction.reply({
                        content: "No command with that name was found",
                        ephemeral: true
                    });
                } else {
                    embed.setTitle("Command Information");
                    embed.addFields({
                        name: "General",
                        value:
                            `
**Name:** ${command.data.name}
**Description:** ${command.data.description}
**Category:** ${client.categories.find(category => category.commands.includes(query)).name}
                            `
                    });

                    if (command.data.options) {
                        command.data.options.map(option => {
                            if (option.type === "SUB_COMMAND_GROUP") {
                                embed.addFields({
                                    name: "Subcommand group",
                                    value:
                                        `
**Name:** ${option.name}
**Description:** ${option.description}
**Subcommands:** 
${option.options.map(subCommand => `─ **${subCommand.name}:** ${subCommand.description}
${subCommand.options ? `─ **Options:**
${subCommand.options.map(option => `── **${option.name}:** ${option.description} (${option.type}) ${option.required ? "(Required)" : ""}`)}` : ""}`).join("\n")}
                                        `
                                });
                            } else if (option.type === "SUB_COMMAND") {
                                embed.addFields({
                                    name: "Subcommand",
                                    value:
                                        `
**Name:** ${option.name}
**Description:** ${option.description}
${option.options ? `**Options:** 
${option.options.map(option => `**─ ${option.name}:** ${option.description} (${option.type}) ${option.required ? "(Required)" : ""}`).join("\n")}` : ""}
                                        `
                                });
                            } else {
                                embed.addFields({
                                    name: "Option",
                                    value: `**${option.name}:** ${option.description} (${option.type}) ${option.required ? "(Required)" : ""}`
                                });
                            }
                        });
                    }
                }

                return interaction.reply({ embeds: [embed] });
            }
        }
    }
});