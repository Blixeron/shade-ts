const Slash = require("../../main/classes/command");

module.exports = new Slash({
    data: {
        name: "nick",
        description: "Change the nickname of a member",
        options: [
            {
                name: "target",
                description: "Select the member",
                type: "USER",
                required: true
            },
            {
                name: "nickname",
                description: "Type the new nickname, or ignore this option to reset",
                type: "STRING",
                required: false
            },
            {
                name: "reason",
                description: "Give a reason",
                type: "STRING",
                required: false
            }
        ]
    },

    guildOnly: true,
    permission: "MANAGE_NICKNAMES",

    run: async ({ client, interaction }) => {
        const target = interaction.options.getMember("target");
        const nickname = interaction.options.getString("nickname");
        const reason = interaction.options.getString("reason") || "No reason provided.";

        if (!client.check.hierarchy(target, interaction)) {
            if (!nickname) {
                if (!target.nick) {
                    return interaction.reply({
                        content: `**${target.user.tag}** doesn't have a nickname.`,
                        ephemeral: true
                    });
                } else {
                    await target.setNickname(null, reason);
                    return interaction.reply(`**${target.user.tag}**'s nickname has been reset, because: "${reason}"`);
                }
            } else {
                if (nickname.length >= 32) {
                    return interaction.reply({
                        content: "The nickname length can't be over 32 characters.",
                        ephemeral: true
                    });
                } else {
                    await target.setNickname(nickname, reason);
                    return interaction.reply(`**${target.user.tag}**'s nickname has been set to: **${nickname}**, because: "${reason}"`);
                }
            }
        }
    }
});