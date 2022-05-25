const Command = require("../../bot/classes/command");

module.exports = new Command({
    data: {
        name: "kick",
        description: "Kick someone out of this server.",
        options: [
            {
                name: "target",
                description: "Select who you want to kick.",
                type: "USER",
                required: true
            },
            {
                name: "reason",
                description: "Give a reason.",
                type: "STRING",
                required: false
            }
        ]
    },

    permission: "KICK_MEMBERS",

    run: async ({ interaction }) => {
        let target = interaction.options.getMember("target");
        let reason = interaction.options.getString("reason") || "No reason provided.";

        if (target.id == interaction.user.id) {
            return interaction.reply({
                content: "You can't kick yourself out.",
                ephemeral: true
            });
        } else if (interaction.member.roles.highest < target.roles.highest) {
            return interaction.reply({
                content: `**${target.user.tag}** has a higher role than you in hierarchy.`,
                ephemeral: true
            });
        } else if (interaction.guild.me.roles.highest < target.roles.highest) {
            return interaction.reply({
                content: `**${target.user.tag}** has a higher role than me in hierarchy.`,
                ephemeral: true
            });
        }

        await target.kick(reason);
        return interaction.reply(`**${target.user.tag}** has been kicked. Reason: ${reason}`);
    }
});