const Command = require("../../main/classes/command");

module.exports = new Command({
    data: {
        name: "kick",
        description: "Kick someone out of this server",
        options: [
            {
                name: "target",
                description: "Select who you want to kick",
                type: "USER",
                required: true
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
    permission: "KICK_MEMBERS",

    run: async ({ client, interaction }) => {
        const target = interaction.options.getUser("target");
        const reason = interaction.options.getString("reason") || "No reason provided.";

        const user = await client.users.fetch(target.id);
        const member = interaction.guild.members.cache.get(target.id);

        if (interaction.guild.members.cache.has(target.id)) {
            if (!client.check.hierarchy(target, interaction, true)) {
                await target.kick(reason);
                return interaction.reply(`**${member.user.tag}** has been kicked, because: "${reason}"`);
            }
        } else {
            return interaction.reply({
                content: `**${user.tag}** isn't currently in this server.`,
                ephemeral: true
            });
        }
    }
});