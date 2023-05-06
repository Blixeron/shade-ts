import { ChatInputCommandInteraction, ContextMenuCommandInteraction } from 'discord.js';

export function sparklify(
    interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction,
    text: string,
    ephemeral?: boolean
) {
    return interaction.reply({
        content: `✨ ${text.toUpperCase().split('').join(' ').substring(0, 1996)} ✨`,
        ephemeral: ephemeral
    });
}