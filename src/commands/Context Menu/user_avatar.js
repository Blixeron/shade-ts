const Command = require("../../main/classes/command");

module.exports = new Command({
    data: {
        name: "User Avatar",
        type: "USER"
    },

    run: async ({ client, interaction }) => {
        const target = await client.users.fetch(interaction.targetId);

        return interaction.reply({
            content: target.displayAvatarURL({ size: 1024, format: "png", dynamic: true }),
            ephemeral: true
        });
    }
});