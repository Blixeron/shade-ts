import { CommandInteraction, GuildChannelResolvable, PermissionsString } from 'discord.js';

import * as names from '../assets/names.json';

/*
These check functions are used to check for specific situations to decide
if the bot should continue the command execution or not.
These must be implemented within an if-statement.
*/

/**
 * Cheks if the user executing the command is the bot developer, so only the bot developer can use it.
 */
export function ownerOnly(interaction: CommandInteraction) {
    if (interaction.user.id != interaction.client.application.owner.id) {
        interaction.reply({
            content: 'This command can only be used by the bot developer.',
            ephemeral: true
        });

        return;
    }

    return true;
}

/**
 * Checks if the bot has certain permissions. If 'channel' is provided, the bot will check
 * for permissions on that channel. Otherwise it checks for global permissions.
 */
export function clientHasPermissions({ interaction, permissions, channel }: { interaction: CommandInteraction; permissions: PermissionsString[]; channel?: GuildChannelResolvable; }) {
    const permissionsNames = permissions.map(p => names.permissions[p]);

    if (channel) {
        if (!permissions.every(p => interaction.guild.members.me.permissionsIn(channel).has(p))) {

            interaction.reply({
                content: `I need **${permissionsNames.length > 1 ? `${permissionsNames.slice(0, -1).join(', ')} and ${permissionsNames.slice(-1)[0]}` : permissionsNames[0]}** permissions in ${channel} to run this command.`,
                ephemeral: true
            });

            return;
        }
    } else {
        if (!permissions.every(p => interaction.appPermissions.has(p))) {
            interaction.reply({
                content: `I need **${permissionsNames.length > 1 ? `${permissionsNames.slice(0, -1).join(', ')} and ${permissionsNames.slice(-1)[0]}` : permissionsNames[0]}** permissions to run this command.`,
                ephemeral: true
            });

            return;
        }

        return true;
    }
}