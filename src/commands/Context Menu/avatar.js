const Command = require("../../bot/classes/command");

module.exports = new Command({
    data: {
        name: "Avatar",
        type: "USER"
    },

    run: async ({ interaction }) => {
        let target = await interaction.guild.members.fetch(interaction.targetId);

        return interaction.reply(target.user.avatarURL({ size: 1024, format: "png", dynamic: true }));
    }
});