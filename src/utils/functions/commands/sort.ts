import { ChatInputCommandInteraction, ContextMenuCommandInteraction } from 'discord.js';

export function sort(
    interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction,
    text: string,
    ephemeral?: boolean
) {
    const sorted = text.split(' ').map(i => ({ value: i, sortValue: Math.random() }))
        .sort((a, b) => a.sortValue - b.sortValue)
        .map(({ value }) => value);

    const sortedString = sorted.join(' ');

    return interaction.reply({
        content: sortedString,
        ephemeral: ephemeral
    });
}