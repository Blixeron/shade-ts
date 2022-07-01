import { Interaction } from "detritus-client";

import { BaseCommandOption } from "../../../baseCommand";

export class ServerIconCommand extends BaseCommandOption {
    name = "icon";
    description = "Check the icon of the current server";

    async run(context: Interaction.InteractionContext) {
        context.editOrRespond(context.guild?.icon ? `https://cdn.discordapp.com/icons/${context.guildId}/${context.guild?.icon}.${context.guild?.icon?.startsWith("a_") ? "gif" : "png"}?size=1024` : "The current guld has no icon.");
    }
}