const Command = require("../../main/classes/command");

module.exports = new Command({
    data: {
        name: "unban",
        description: "Ban someone from this server.",
        options: [
            {
                name: "target",
                description: "Select who you want to unban.",
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

    guildOnly: true,
    permission: "BAN_MEMBERS",

    run: async ({ client, interaction }) => {
        const target = interaction.options.getUser("target");
        const reason = interaction.options.getString("reason") || "No reason provided.";
        const user = await client.users.fetch(target.id);

        if (!(await interaction.guild.bans.fetch()).find(member => member.user.id == user.id)) {
            return interaction.reply({
                content: `**${user.tag}** isn't currently banned.`,
                ephemeral: true
            });
        }

        await interaction.guild.members.unban(target.id);
        return interaction.reply(`**${user.tag}** has been unbanned, because: "${reason}"`);
    }
});