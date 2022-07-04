import { Interaction } from "detritus-client";
import { ApplicationCommandOptionTypes, MessageFlags } from 'detritus-client/lib/constants';
import { Embed } from "detritus-client/lib/utils";

import { BaseSlashCommand } from "../../baseCommand";

import { OptionTypes } from "../../../assets/constants";

import categories from "../../../utils/collections/categories";

interface CommandArgs {
    command?: string;
}

export default class HelpCommand extends BaseSlashCommand {
    name = "help";
    description = "Get help about how to use my commands";

    constructor() {
        super({
            options: [
                {
                    name: "command",
                    description: "Select a command to get help about",
                    required: false,
                    type: ApplicationCommandOptionTypes.STRING,
                }
            ]
        });
    }

    async run(context: Interaction.InteractionContext, args: CommandArgs) {
        const embed = new Embed;

        if (args.command) {
            const command = context.client.interactionCommandClient?.commands.find(
                (command) => command.name === args.command && !command.metadata.ownerOnly
            );

            if (!command) {
                return context.editOrRespond({
                    content: "No command with that name was found.",
                    flags: MessageFlags.EPHEMERAL
                });
            } else {
                embed.setTitle(`"${command.name}" Slash Command`);
                embed.setDescription(
                    `
**Description:** ${command.description}
**Category:** ${categories.find(category => category.commands.includes(command.name))?.name}
                `
                );

                if (command.options) {
                    const options1 = [];

                    for (const option1 of command.options) {
                        let tree1 = {} as any;
                        let tree2 = {} as any;
                        let tree3 = {} as any;
                        const options2 = [];

                        command.options.indexOf(option1) < command.options.length - 1 ? tree1 = { a: `├`, b: `│` } : tree1 = { a: `└`, b: ` ` };

                        if (option1.options) {
                            for (const option2 of option1.options) {
                                const options3 = [];

                                option1.options.indexOf(option2) < option1.options.length - 1 ? tree2 = { a: `├`, b: `│` } : tree2 = { a: `└`, b: ` ` };

                                if (option2.options) {
                                    for (const option3 of option2.options) {
                                        option2.options.indexOf(option3) < option2.options.length - 1 ? tree3 = { a: `├`, b: `│` } : tree3 = { a: `└`, b: ` ` };

                                        options3.push(`\n${tree1.b}   ${tree2.b}   ${tree3.a}── Name: "${option3.name}"
${tree1.b}   ${tree2.b}   ${tree3.b}   Description: "${option3.description}"
${tree1.b}   ${tree2.b}   ${tree3.b}   Type: ${OptionTypes[option3.type]}
${tree1.b}   ${tree2.b}   ${tree3.b}   Required: ${option3.required ? "Yes" : "No"}`);
                                    }
                                }

                                options2.push(`\n${tree1.b}   ${tree2.a}── Name: "${option2.name}"
${tree1.b}   ${tree2.b}   Description: "${option2.description}"
${tree1.b}   ${tree2.b}   Type: ${OptionTypes[option2.type]} ${option2.type == 1 ? (option2.options ? `\n${tree1.b}   ${tree2.b}   Options: ${options3.join("")}` : ``) : `\n${tree1.b}   ${tree2.b}   Required: ${option2.required ? `Yes` : `No`}`}`);
                            }
                        }

                        options1.push(`\n${tree1.a}── Name: "${option1.name}"
${tree1.b}   Description: "${option1.description}"
${tree1.b}   Type: ${OptionTypes[option1.type]} ${(option1.type == 1 || option1.type == 2) ? (option1.options ? `\n${tree1.b}   Options: ${options2.join(``)}` : ``) : `\n${tree1.b}   Required: ${option1.required ? `Yes` : `No`}`}`);
                    }

                    const optionsEmbed = new Embed;

                    optionsEmbed.setTitle("Command Options");

                    optionsEmbed.setDescription(`\`\`\`${options1.join("\n│")}\`\`\``);

                    return context.editOrRespond({ embeds: [embed, optionsEmbed] });
                }

                return context.editOrRespond({ embeds: [embed] });
            }
        } else {
            embed.setTitle("Showing all commands");

            categories.filter(category => category.name !== "Owner").forEach(category => {
                embed.addField(category.name, category.commands.join(", "));
            });

            embed.setFooter("Use the 'command' option to get more information about a command.");

            return context.editOrRespond({ embeds: [embed] });
        }
    }
}