import { Interaction } from "detritus-client";
import { ApplicationCommandOptionTypes, MessageFlags } from 'detritus-client/lib/constants';

import axios from "axios";

import { BaseCommandOption } from "../../../baseCommand";
import { Embed } from "detritus-client/lib/utils";

interface CommandArgs {
    name: string;
}

export class GitHubAccountCommand extends BaseCommandOption {
    name = "account";
    description = "Check information about a GitHub account";

    constructor() {
        super({
            options: [
                {
                    name: "name",
                    description: "Type in the name of the account",
                    required: true,
                    type: ApplicationCommandOptionTypes.STRING
                }
            ]
        });
    }

    async run(context: Interaction.InteractionContext, args: CommandArgs) {
        const embed = new Embed;

        try {
            const data = await axios.get(`https://api.github.com/users/${args.name}`).then(res => res.data);

            embed.setTitle(data.login);

            embed.setThumbnail(data.avatar_url);

            embed.setDescription(`${data.bio || "No biography"}`);

            embed.addField("Account Profile", `
**Nickname:** ${data.name || "None"}
**Email:** ${data.email || "None"}
**Location:** ${data.location || "Not provided"}
**Company:** ${data.company || "Not provided"}
**Twitter:** ${data.twitter_username ? `[${data.twitter_username}](https://twitter.com/${data.twitter_username})` : "Not provided"}
                `, true);

            embed.addField("Account Information", `
**Account ID:** ${data.id}
**Type:** ${data.type}
**Created at:** <t:${new Date(data.created_at).getTime() / 1000}>
**Updated at:** <t:${new Date(data.updated_at).getTime() / 1000}>
                `, true);

            embed.addField("Counts", `
**Repositories:** ${data.public_repos}
**Gists:** ${data.public_gists}
**Followers:** ${data.followers}
**Following:** ${data.following}
            `);

            embed.addField("Links", `
**Avatar:** [Avatar](${data.avatar_url})
**Overview:** [Overview](${data.html_url})
                `, true);

            return context.editOrRespond({ embeds: [embed] });
        } catch (err) {
            return context.editOrRespond({
                content: "I couldn't find that account in GitHub's database.",
                flags: MessageFlags.EPHEMERAL
            });
        }
    }
}