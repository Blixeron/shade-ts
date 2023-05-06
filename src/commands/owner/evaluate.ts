import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, codeBlock } from 'discord.js';
import { Command } from '../../utils/commands';
import * as check from '../../utils/check';

const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;

export default new Command({
    data: {
        name: 'evaluate',
        description: 'Evaluates code.',
        options: [
            {
                name: 'code',
                description: 'The code to evaluate.',
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: 'async',
                description: 'Whether to evaluate the code as an async function or not.',
                type: ApplicationCommandOptionType.Boolean
            },
            {
                name: 'ephemeral',
                description: 'Whether to send the result as an ephemeral message or not.',
                type: ApplicationCommandOptionType.Boolean
            }
        ]
    },

    run: async (interaction: ChatInputCommandInteraction) => {
        const code = interaction.options.getString('code');
        let output: string;
        const embed = new EmbedBuilder();

        if (check.ownerOnly(interaction)) {
            try {
                if (interaction.options.getBoolean('async')) {
                    const func = new AsyncFunction('interaction', code);
                    output = await func(interaction);

                    embed.setFooter({ text: 'Asynchronous evaluation' });
                } else {
                    output = await Promise.resolve(eval(code));
                }

                interaction.reply({
                    embeds: [
                        new EmbedBuilder({
                            title: 'Input',
                            description: codeBlock('js', code)
                        }),
                        embed
                            .setTitle('Output')
                            .setDescription(codeBlock('js', String(output).substring(0, 4081)))
                    ],
                    ephemeral: interaction.options.getBoolean('ephemeral')
                });
            } catch (err) {
                interaction.reply({
                    content: `${err}`,
                    ephemeral: true
                });
            }
        }
    }
});