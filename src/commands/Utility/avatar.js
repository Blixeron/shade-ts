const Command = require("../../bot/classes/command");

module.exports = new Command({
    data: {
        name: "avatar",
        description: "Check someone's avatar, or your own.",
        options: [
            {
                name: "target",
                description: "Select who you want to check the avatar of.",
                type: "USER",
                required: false
            }
        ]
    },

    run: async ({ client, interaction }) => {
        let target = interaction.options.getUser("target");

        if (!target) {
            target = interaction.user;
        }

        return interaction.reply(target.avatarURL({ size: 1024, format: "png", dynamic: true }));
    }
});