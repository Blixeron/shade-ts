const Command = require("../../main/classes/command");

module.exports = new Command({
    data: {
        name: "ban",
        description: "Ban someone from this server",
        options: [
            {
                name: "target",
                description: "Select who you want to ban",
                type: "USER",
                required: true
            },
            {
                name: "reason",
                description: "Give a reason",
                type: "STRING",
                required: false
            },
            {
                name: "clean",
                description: "Clean messages sent by this user in a specific amount of days",
                type: "INTEGER",
                required: false,
                min_value: 0,
                max_value: 7
            }
        ]
    },

    guildOnly: true,
    permission: "BAN_MEMBERS",

    run: async ({ client, interaction }) => {
        const target = interaction.options.getUser("target");
        const reason = interaction.options.getString("reason") || "No reason provided.";
        const days = interaction.options.getInteger("clean");
        
        const user = await client.users.fetch(target.id);
        const member = interaction.guild.members.cache.get(target.id);

        if (interaction.guild.members.cache.has(target.id)) {
            if (!client.check.hierarchy(member, interaction)) {
                await member.ban({ reason: reason, days: days });
            }
        } else {
            if (interaction.guild.bans.cache.has(user.id)) {
                return interaction.reply({
                    content: `**${user.tag}** is already banned.`,
                    ephemeral: true
                });
            }

            await interaction.guild.bans.create(target.id, { reason: reason, days: days });
        }

        return interaction.reply(`**${user.tag}** has been banned, because: "${reason}"`);
    }
});