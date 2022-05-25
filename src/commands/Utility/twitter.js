const Command = require("../../bot/classes/command");
const secrets = require("../../secrets.json");
const discord = require("discord.js");
const axios = require("axios");
const needle = require("needle");

module.exports = new Command({
    data: {
        name: "twitter",
        description: "Check information in Twitter.",
        options: [
            {
                name: "account",
                description: "Check information about a Twitter account.",
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
                name: "tweets",
                description: "Check someone's tweets.",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "username",
                        description: "The username of the account.",
                        type: "STRING",
                        required: true
                    },
                    {
                        name: "amount",
                        description: "How many tweets should I search for?",
                        type: "NUMBER",
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
            let endpointURL = "https://api.twitter.com/2/users/by?usernames=";
            let params = {
                usernames: username,
                "user.fields": "created_at,description,location,profile_image_url,public_metrics,verified",
                "expansions": "pinned_tweet_id"
            }

            let account = await needle("get", endpointURL, params, {
                headers: {
                    "User-Agent": "v2UserLookupJS",
                    Authorization: `Bearer ${secrets.twitter.token}`
                }
            });

            if (account.statusCode != 200) {
                interaction.reply({
                    content: "I couldn't find that account in Twitter's database.",
                    ephemeral: true
                })
            } else {

                embed.setTitle("Twitter Account");
                embed.setThumbnail(account.body.data[0].profile_image_url);
                embed.addFields(
                    {
                        name: "Account Profile",
                        value:
                            `
**Username:** ${account.body.data[0].username}
**Nickname:** ${account.body.data[0].name}
**Biography:** ${account.body.data[0].description || "No biography provided."}
**Location:** ${account.body.data[0].location || "No location provided."}
                    `
                    },
                    {
                        name: "Account Information",
                        value:
                            `
**Account ID:** ${account.body.data[0].id}
**Verified:** ${account.body.data[0].verified ? "Yes" : "No"}
**Created at:** <t:${new Date(account.body.data[0].created_at).getTime() / 1000}:F>
                    `
                    },
                    {
                        name: "Public Metrics",
                        value:
                            `
**Followers:** ${account.body.data[0].public_metrics.followers_count}
**Following:** ${account.body.data[0].public_metrics.following_count}
**Tweet count:** ${account.body.data[0].public_metrics.tweet_count}
                    `
                    }
                );

                return interaction.reply({ embeds: [embed] });
            }

        } else {
            return interaction.reply("Work in progress...");
        }
    }
});