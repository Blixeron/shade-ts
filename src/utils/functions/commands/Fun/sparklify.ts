import { Interaction } from "detritus-client";
import { MessageFlags } from "detritus-client/lib/constants";

export function sparklify(context: Interaction.InteractionContext, text: string, ephemeral?: boolean): Promise<any> {
    return context.editOrRespond({
        content: `✨ ${String(text.toUpperCase().split("").join(" ")).substring(0, 1994)} ✨`,
        flags: ephemeral ? MessageFlags.EPHEMERAL : 0
    });
}