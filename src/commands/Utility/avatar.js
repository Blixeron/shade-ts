const Command = require("../../main/classes/command");

module.exports = new Command({
    data: {
        name: "avatar",
        description: "Check someone's avatar, or your own",
        options: [
            {
                name: "target",
                description: "Select who you want to check the avatar of, defaults to yourself",
                type: "USER",
                required: false
            }
        ]
    },

    run: async ({ interaction }) => {
        const target = interaction.options.getUser("target") || interaction.user;

        return interaction.reply(target.displayAvatarURL({ size: 1024, format: "png", dynamic: true }));
    }
});