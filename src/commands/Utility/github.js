const Command = require("../../bot/classes/command");
const discord = require("discord.js");
const axios = require("axios");

module.exports = new Command({
    data: {
        name: "github",
        description: "Check information in GitHub.",
        options: [
            {
                name: "account",
                description: "Check information about a GitHub account.",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "username",
                        description: "The username of the account.",
                        type: "STRING",
                        required: true
                    }
                ]
            },
            {
                name: "repository",
                description: "Check information about a GitHub repository.",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "username",
                        description: "The username of the account that owns the repository.",
                        type: "STRING",
                        required: true
                    },
                    {
                        name: "repo_name",
                        description: "The name of the repository.",
                        type: "STRING",
                        required: true
                    }
                ]
            }
        ]
    },

    run: async ({ interaction }) => {
        let username = interaction.options.getString("username");
        let embed = new discord.MessageEmbed;

        if (interaction.options.getSubcommand() == "account") {
            try {
                /** @type {axios.Axios} */
                let account = await axios.get(`https://api.github.com/users/${username}`);
                embed.setTitle("GitHub Account");
                embed.setThumbnail(account.data.avatar_url);
                embed.addFields(
                    {
                        name: "Account Profile",
                        value:
                            `
**Username:** ${account.data.login}
**Nickname:** ${account.data.name || "No nickname has been set."}
**Biography:** ${account.data.bio || "No biography has been set."}
**Email:** ${account.data.email || "No email provided."}
**Location:** ${account.data.location || "No location provided."}
**Company:** ${account.data.company || "No company provided."}
**Twitter:** ${`[${account.data.twitter_username}](https://twitter.com/${account.data.twitter_username})` || "No twitter account provided."}
                            `
                    },
                    {
                        name: "Account Information",
                        value:
                            `
**Account ID:** ${account.data.id}
**Type:** ${account.data.type}
**Created at:** <t:${new Date(account.data.created_at).getTime() / 1000}>
**Updated at:** <t:${new Date(account.data.updated_at).getTime() / 1000}>
                            `
                    },
                    {
                        name: "Links",
                        value:
                            `
**Avatar:** [Avatar](${account.data.avatar_url})
**Overview:** [Overview](${account.data.html_url})
**Repositories:** [Repos](${account.data.html_url}?tab=repositories) (${account.data.public_repos})
**Gists:** [Gists](${account.data.html_url}?tab=gists) (${account.data.public_gists})
**Followers:** [Followers](${account.data.html_url}?tab=followers) (${account.data.followers})
**Following:** [Following](${account.data.html_url}?tab=following) (${account.data.following})
**Packages:** [Packages](${account.data.html_url}?tab=packages)
                                `
                    }
                );

                return interaction.reply({ embeds: [embed] });
            } catch (err) {
                return interaction.reply({
                    content: "I couldn't find that account in GitHub's database.",
                    ephemeral: true
                });
            }
        } else if (interaction.options.getSubcommand() == "repository") {
            return interaction.reply("Work in progress.");
        }
    }
});