const permissions = require("../validations/permissions.json");

module.exports = {
    permissions(command, interaction) {
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
    }
};