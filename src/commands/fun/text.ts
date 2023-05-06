import { ApplicationCommandOptionType, ChatInputCommandInteraction } from 'discord.js';
import { Command } from '../../utils/commands';
import { emojify } from '../../utils/functions/commands/emojify';
import { sparklify } from '../../utils/functions/commands/sparklify';
import { sort } from '../../utils/functions/commands/sort';

export default new Command({
    data: {
        name: 'text',
        description: 'Funny modifications to text.',
        options: [
            {
                name: 'emojify',
                description: '🤔 Emojify 🚀 a given text. 💥',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: 'text',
                        description: 'The text to emojify.',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                        maxLength: 600
                    }
                ]
            },
            {
                name: 'sparklify',
                description: '✨ S P A R K L I F Y ✨ a given text.',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: 'text',
                        description: 'The text to sparklify.',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                        maxLength: 600
                    }
                ]
            },
            {
                name: 'sort',
                description: 'Changes the order of the words in a text randomly.',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: 'text',
                        description: 'The text to sort.',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                        maxLength: 2000
                    }
                ]
            }
        ]
    },

    run: async (interaction: ChatInputCommandInteraction) => {
        const text = interaction.options.getString('text');

        switch (interaction.options.getSubcommand()) {
            case 'emojify':
                emojify(interaction, text);

                break;
            case 'sparklify':
                sparklify(interaction, text);

                break;
            case 'sort':
                sort(interaction, text);
        }
    }
});
