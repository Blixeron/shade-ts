const fetch = require("node-fetch").default;
const Command = require("../../main/classes/command");

module.exports = new Command({
    data: {
        name: "github",
        description: "Check information in GitHub",
        options: [
            {
                name: "account",
                description: "Check information about a GitHub account",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "username",
                        description: "The username of the account",
                        type: "STRING",
                        required: true
                    }
                ]
            },
            {
                name: "repository",
                description: "Check information about a GitHub repository",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "username",
                        description: "The username of the account that owns the repository",
                        type: "STRING",
                        required: true
                    },
                    {
                        name: "repo_name",
                        description: "The name of the repository",
                        type: "STRING",
                        required: true
                    }
                ]
            }
        ]
    },

    run: async ({ client, interaction }) => {
        const username = interaction.options.getString("username");
        const embed = new client.discord.MessageEmbed;

        switch (interaction.options.getSubcommand()) {
            case "account": {
                try {
                    const data = await fetch(`https://api.github.com/users/${username}`).then(data => data.json());

                    embed.setTitle(data.login);
                    embed.setThumbnail(data.avatar_url);
                    embed.setDescription(`${data.bio || "No biography"}`);
                    embed.addFields(
                        {
                            name: "Account Profile",
                            value:
                                `
**Nickname:** ${data.name || "None"}
**Email:** ${data.email || "None"}
**Location:** ${data.location || "Not provided"}
**Company:** ${data.company || "Not provided"}
**Twitter:** ${data.twitter_username ? `[${data.twitter_username}](https://twitter.com/${data.twitter_username})` : "Not provided"}
                                `,
                            inline: true
                        },
                        {
                            name: "Account Information",
                            value:
                                `
**Account ID:** ${data.id}
**Type:** ${data.type}
**Created at:** <t:${new Date(data.created_at).getTime() / 1000}>
**Updated at:** <t:${new Date(data.updated_at).getTime() / 1000}>
                                `,
                            inline: true
                        },
                        {
                            name: "Links",
                            value:
                                `
**Avatar:** [Avatar](${data.avatar_url})
**Overview:** [Overview](${data.html_url})
**Repositories:** [Repos](${data.html_url}?tab=repositories) (${data.public_repos})
**Gists:** [Gists](${data.html_url}?tab=gists) (${data.public_gists})
**Followers:** [Followers](${data.html_url}?tab=followers) (${data.followers})
**Following:** [Following](${data.html_url}?tab=following) (${data.following})
**Packages:** [Packages](${data.html_url}?tab=packages)
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
            } break;

            case "repository": {
                const repoName = interaction.options.getString("repo_name");
                try {
                    const data = await fetch(`https://api.github.com/repos/${username}/${repoName}`).then(data => data.json());
                    embed.setTitle(data.name);
                    embed.setDescription(data.description || "No description");
                    embed.addFields(
                        {
                            name: "General Information",
                            value:
                                `
**Full name:** ${data.full_name}
**Owner:** [${data.owner.login}](${data.owner.html_url})
**Topics:** ${data.topics.join(", ") || "None"}
**Created at:** <t:${new Date(data.created_at).getTime() / 1000}>
**Updated at:** <t:${new Date(data.updated_at).getTime() / 1000}>
                                `

                        },
                        {
                            name: "Technical Information",
                            value:
                                `
**Language:** ${data.language || "No language defined"}
**Forked:** ${data.is_fork ? "Yes" : "No"}
**Clone URL:** ${data.clone_url}
                                `,
                            inline: true
                        },
                        {
                            name: "Links",
                            value:
                                `
**Overview:** [Overview](${data.svn_url})
**Issues:** [Issues](${data.svn_url}/issues) (${data.open_issues} Open)
**Forks:** [Forks](${data.svn_url}/forks) (${data.forks})
                                `,
                            inline: true
                        }
                    );

                    return interaction.reply({ embeds: [embed] });
                } catch (err) {
                    return interaction.reply({
                        content: "I couldn't find that repository in GitHub's database.",
                        ephemeral: true
                    });
                }
            }
        }
    }
});