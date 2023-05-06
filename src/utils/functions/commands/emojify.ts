import { ChatInputCommandInteraction, MessageContextMenuCommandInteraction } from 'discord.js';

import * as emojis from '../../../assets/emojis.json';

export async function emojify(
    interaction: ChatInputCommandInteraction | MessageContextMenuCommandInteraction,
    text: string,
    ephemeral?: boolean
) {
    let input = text.split(' ');
    let count = 0;

    while (count < input.length) {
        count += Math.floor(Math.random() * 5);
        const text = input[count];

        if (text) {
            input[count] = `${text} ${emojis.all[Math.floor(Math.random() * emojis.all.length)]}`;
        }
    }

    return interaction.reply({
        content: `${input.join(' ')} ${emojis.all[Math.floor(Math.random() * emojis.all.length)]}`.substring(0, 2000),
        ephemeral: ephemeral
    });
}