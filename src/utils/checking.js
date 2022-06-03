const permissions = require("../validations/permissions.json");

module.exports = {
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
    }
};