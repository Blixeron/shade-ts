import { Interaction } from "detritus-client";

import { BaseCommandOption } from "../../../baseCommand";

export class ServerInformationCommand extends BaseCommandOption {
    name = "information";
    description = "Check information about the current server";

    async run(context: Interaction.InteractionContext) {
        context.editOrRespond("wip");
    }
}