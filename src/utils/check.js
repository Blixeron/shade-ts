const discord = require("discord.js");
const Command = require("../main/classes/command");
const permissions = require("../utils/validations/permissions.json");

module.exports = {
    /** 
     * @param {Command} command
     * @param {discord.CommandInteraction} interaction
     */
    permissionsAuto(command, interaction) {
        if (command.permission && !interaction.memberPermissions.has(command.permission)) {
            return interaction.reply({
                content: `You're missing the **${permissions[command.permission]}** permission, which is required to run this command.`,
                ephemeral: true
            });
        } else if (command.permission && !interaction.guild.me.permissions.has(command.permission)) {
            return interaction.reply({
                content: `I need the **${permissions[command.permission]}** permission to run this command.`,
                ephemeral: true
            });
        }
    },

    /**
     * @param {discord.PermissionResolvable} permission
     * @param {discord.CommandInteraction} interaction
     */
    permissionsManual(permission, interaction) {
        if (!interaction.memberPermissions.has(permission)) {
            interaction.reply({
                content: `You're missing the **${permissions[permission]}** permission, which is required to run this command.`,
                ephemeral: true
            });
        } else if (!interaction.guild.me.permissions.has(permission)) {
            interaction.reply({
                content: `I need the **${permissions[permission]}** permission to run this command.`,
                ephemeral: true
            });
        }
    },

    /**
     * @param {discord.GuildMember} target
     * @param {discord.CommandInteraction} interaction
     * @param {boolean} checkInteractionMember
     */
    hierarchy(target, interaction, checkInteractionMember) {
        if (interaction.member.id != interaction.guild.ownerId) {
            if (checkInteractionMember && target.id == interaction.user.id) {
                return interaction.reply({
                    content: "You can't do that to yourself.",
                    ephemeral: true
                });
            }

            if (target.id == interaction.guild.me.id) {
                return interaction.reply({
                    content: "You can't do that to me using my commands.",
                    ephemeral: true
                });
            } else if (target.id == interaction.guild.ownerId) {
                return interaction.reply({
                    content: `**${target.user.tag}** owns this server.`,
                    ephemeral: true
                });
            } else if (interaction.member.roles.highest.position <= target.roles.highest.position) {
                return interaction.reply({
                    content: `You need a higher role than **${target.user.tag}** to do this.`,
                    ephemeral: true
                });
            } else if (interaction.guild.me.roles.highest.position <= target.roles.highest.position) {
                return interaction.reply({
                    content: `I need a higher role than **${target.user.tag}** to do this.`,
                    ephemeral: true
                });
            }
        } else return;
    }
};