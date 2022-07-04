import { Interaction } from "detritus-client";
import { ComponentActionRow, Embed } from "detritus-client/lib/utils";
import { BaseSlashCommand } from "../../baseCommand";

import * as pkg from "../../../../package.json";
import { readyTimestamp } from "../../../listeners/gatewayReady";
import categories from "../../../utils/collections/categories";

export default class AboutCommand extends BaseSlashCommand {
    name = "about";
    description = "Check information about me";

    async run(context: Interaction.InteractionContext) {
        const embed = new Embed;
        const row = new ComponentActionRow;

        row.addButton({
            label: "GitHub",
            style: 5,
            url: "https://github.com/BlixerDev/shade"
        });

        embed.setThumbnail(context.client.user!.avatarUrl);

        embed.setTitle(`About ${context.client.user!.username}`);

        embed.addField("Counts", `
**Users:** ${context.client.users.filter(user => !user.bot).length}
**Servers:** ${context.client.guilds.cache.size}
**Categories:** ${categories.size}
**Commands:** ${context.client.interactionCommandClient!.commands.size}
**Shards:** ${context.client.shardCount}
        `, true);

        embed.addField("Development", `
**Developer:** [Blixer](https://twitter.com/BlixerDev)
**Language:** TypeScript
**Library:** detritus-client${pkg.dependencies["detritus-client"]}
**Dependencies:** ${Object.keys(pkg.dependencies).length}
**Version:** ${pkg.version}
        `, true);

        embed.addField("Connection", `
**Up since:** <t:${Math.ceil(readyTimestamp / 1000)}>
**Gateway:** ${(await context.client.ping()).gateway}ms
**Rest:** ${(await context.client.ping()).rest}ms
        `);

        embed.setFooter("Thanks to Napo, Willyy and xFrak for testing.");

        context.editOrRespond({ embeds: [embed], components: [row] });
    }
}