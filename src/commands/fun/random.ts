import { ApplicationCommandOptionType, ChatInputCommandInteraction } from 'discord.js';
import { Command } from '../../utils/commands';
import axios from 'axios';

export default new Command({
    data: {
        name: 'random',
        description: 'Funny commands based on randomness.',
        options: [
            {
                name: '8ball',
                description: 'Ask something to the magic 8 Ball.',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: 'question',
                        description: 'The question to ask.',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                        maxLength: 1000
                    }
                ]
            },
            {
                name: 'percentage',
                description: 'Calculate how much percentage of anything is someone or something.',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: 'target',
                        description: 'What or who you want to calculate the percentage of.',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                        maxLength: 500
                    },
                    {
                        name: 'calculation',
                        description: 'What you want to calculate?',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                        maxLength: 500
                    }
                ]
            },
            {
                name: 'coinflip',
                description: 'Do a coin flip.',
                type: ApplicationCommandOptionType.Subcommand
            },
            {
                name: 'number',
                description: 'Get a random number in a given range.',
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: 'minimum',
                        description: 'The smallest possible number in the range.',
                        type: ApplicationCommandOptionType.Number,
                        required: true
                    },
                    {
                        name: 'maximum',
                        description: 'The biggest possible number in the range.',
                        type: ApplicationCommandOptionType.Number,
                        required: true
                    }
                ]
            }
        ]
    },

    run: async (interaction: ChatInputCommandInteraction) => {
        function random(array: Array<any>) {
            return array[Math.floor((Math.random() * array.length))];
        }

        switch (interaction.options.getSubcommand()) {
            case '8ball':
                const question = interaction.options.getString('question');

                const res = await axios.get(`https://eightballapi.com/api?question=${question}&lucky=false`);

                if (res.status != 200) {
                    interaction.reply({
                        content: 'Oops, looks like I dropped the 8 Ball... Maybe come back later?',
                        ephemeral: true
                    });
                }

                interaction.reply(`${question.endsWith('?') ? question : question + '?'}\n🎱 **${res.data.reading}**`);

                break;
            case 'percentage':
                const target = interaction.options.getString('target');
                const calculation = interaction.options.getString('calculation');

                interaction.reply(`${target} is ${Math.floor(Math.random() * (100 - 0 + 1)) + 0}% **${calculation}.**`);

                break;
            case 'coinflip':
                interaction.reply('🪙');

                setTimeout(() => {
                    interaction.editReply(`The coin landed on **${random(['heads', 'tails'])}!**`);
                }, 1000);

                break;
            case 'number':
                const min = interaction.options.getNumber('minimum');
                const max = interaction.options.getNumber('maximum');

                interaction.reply(`Your number is **${Math.floor(Math.random() * (max - min + 1)) + min}**`);
        }
    }
});
