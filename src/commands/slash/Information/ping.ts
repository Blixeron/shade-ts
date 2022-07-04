import { Interaction } from "detritus-client";

import { BaseSlashCommand } from "../../baseCommand";

export default class PingCommand extends BaseSlashCommand {
    name = "ping";
    description = "Check my latency";

    async run(context: Interaction.InteractionContext) {
        const { gateway, rest } = await context.client.ping();

        return context.editOrRespond(
            `Pong! Gateway latency is **${gateway}ms**, Rest API latency is **${rest}ms** though.`
        );
    }
}