import { Constants, Interaction, Structures, Utils } from 'detritus-client';
const { ApplicationCommandTypes, ApplicationCommandOptionTypes, MessageFlags } = Constants;
const { Embed, Markup } = Utils;

export class BaseInteractionCommand<ParsedArgsFinished = Interaction.ParsedArgs> extends Interaction.InteractionCommand<ParsedArgsFinished> {
    error = 'Command';

    onDmBlocked(context: Interaction.InteractionContext) {
        return context.editOrRespond({
            content: `This command cannot be used in a DM.`,
            flags: MessageFlags.EPHEMERAL,
        });
    }

    onBefore(context: Interaction.InteractionContext) {
        if (context.invoker.metadata && context.invoker.metadata.ownerOnly) {
            if (!context.user.isClientOwner) {
                context.editOrRespond({
                    content: `This command is only for my developer.`,
                    flags: MessageFlags.EPHEMERAL,
                });

                return false;
            }
        }

        return true;
    }

    onRunError(context: Interaction.InteractionContext, args: ParsedArgsFinished, error: any) {
        const embed = new Embed();
        embed.setTitle(`⚠ ${this.error} Error`);
        embed.setDescription(Markup.codestring(String(error)));

        return context.editOrRespond({
            content: `${this.error} Error: ${Markup.codestring(String(error))}`,
            flags: MessageFlags.EPHEMERAL,
        });
    }
}


export class BaseCommandOption<ParsedArgsFinished = Interaction.ParsedArgs> extends Interaction.InteractionCommandOption<ParsedArgsFinished> {
    type = ApplicationCommandOptionTypes.SUB_COMMAND;
}

export class BaseCommandOptionGroup<ParsedArgsFinished = Interaction.ParsedArgs> extends Interaction.InteractionCommandOption<ParsedArgsFinished> {
    type = ApplicationCommandOptionTypes.SUB_COMMAND_GROUP;
}

export class BaseSlashCommand<ParsedArgsFinished = Interaction.ParsedArgs> extends BaseInteractionCommand<ParsedArgsFinished> {
    error = 'Slash Command';
    type = ApplicationCommandTypes.CHAT_INPUT;
}

export interface ContextMenuMessageArgs {
    message: Structures.Message,
}

export class BaseContextMenuMessageCommand extends BaseInteractionCommand<ContextMenuMessageArgs> {
    error = 'Message Context Menu';
    type = ApplicationCommandTypes.MESSAGE;
}

export interface ContextMenuUserArgs {
    member?: Structures.Member,
    user: Structures.User,
}

export class BaseContextMenuUserCommand extends BaseInteractionCommand<ContextMenuUserArgs> {
    error = 'User Context Menu';
    type = ApplicationCommandTypes.USER;
}