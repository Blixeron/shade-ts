import {
    UserFlags,
    PresenceStatuses,
    ApplicationCommandOptionTypes,
    GuildExplicitContentFilterTypes,
    DetritusKeys,
    DiscordKeys,
    MfaLevels,
    VerificationLevels
} from "detritus-client/lib/constants";

export const OptionTypes = Object.freeze({
    [ApplicationCommandOptionTypes.SUB_COMMAND]: "Subcommand",
    [ApplicationCommandOptionTypes.SUB_COMMAND_GROUP]: "Subcommand group",
    [ApplicationCommandOptionTypes.STRING]: "Text",
    [ApplicationCommandOptionTypes.INTEGER]: "Integer",
    [ApplicationCommandOptionTypes.BOOLEAN]: "Boolean",
    [ApplicationCommandOptionTypes.USER]: "User",
    [ApplicationCommandOptionTypes.CHANNEL]: "Channel",
    [ApplicationCommandOptionTypes.ROLE]: "Role",
    [ApplicationCommandOptionTypes.MENTIONABLE]: "Mentionable",
    [ApplicationCommandOptionTypes.NUMBER]: "Number",
    [ApplicationCommandOptionTypes.ATTACHMENT]: "Attachment"
});

export const DiscordUserFlags = Object.freeze({
    [UserFlags.STAFF]: "<:staff:990325461584330813>",
    [UserFlags.PARTNER]: "<:partner:990325199037677618>",
    [UserFlags.HYPESQUAD]: "<:hypesquadevents:991072075244511232>",
    [UserFlags.BUG_HUNTER_LEVEL_1]: "<:bughunter:991072079489155112>",
    [UserFlags.HYPESQUAD_ONLINE_HOUSE_1]: "<:bravery:991074524260876439>",
    [UserFlags.HYPESQUAD_ONLINE_HOUSE_2]: "<:brilliance:991072074237878332>",
    [UserFlags.HYPESQUAD_ONLINE_HOUSE_3]: "<:balance:991074522574778389>",
    [UserFlags.PREMIUM_EARLY_SUPPORTER]: "<:earlysupporter:991072077140336751>",
    [UserFlags.BUG_HUNTER_LEVEL_2]: "<:bughunterlevel2:991075072255082596>",
    [UserFlags.VERIFIED_DEVELOPER]: "<:earlyverifiedbotdeveloper:991072078096629791>",
    [UserFlags.DISCORD_CERTIFIED_MODERATOR]: "<:certifiedmoderator:991072075991113770>"
});

export const DiscordClientStatus = Object.freeze([
    DetritusKeys[DiscordKeys.DESKTOP],
    DetritusKeys[DiscordKeys.MOBILE],
    DetritusKeys[DiscordKeys.WEB]
]);

export const DiscordStatus: Record<string, string> = Object.freeze({
    [PresenceStatuses.ONLINE]: "<:online:932734237487034378> Online",
    [PresenceStatuses.IDLE]: "<:idle:932734218562310254>  Idle",
    [PresenceStatuses.DND]: "<:dnd:932734228871905460> Do Not Disturb",
    [PresenceStatuses.OFFLINE]: "<:offline:932734228121153597> Offline or Invisible"
});

export const GuildVerificationLevel = Object.freeze({
    [VerificationLevels.NONE]: "Unrestricted",
    [VerificationLevels.LOW]: "Members must have a verified email in their Discord account",
    [VerificationLevels.MEDIUM]: "Members must be registered on Discord for longer than 5 minutes",
    [VerificationLevels.HIGH]: "Members must be members of this server for longer than 10 minutes",
    [VerificationLevels.VERY_HIGH]: "Members must have a verified phone number in their Discord account"
});

export const GuildExplicitContentFilter = Object.freeze({
    [GuildExplicitContentFilterTypes.DISABLED]: "Not scanning media content",
    [GuildExplicitContentFilterTypes.MEMBERS_WITHOUT_ROLES]: "Scanning media from members without roles",
    [GuildExplicitContentFilterTypes.ALL_MEMBERS]: "Scanning media from all the members"
});

export const GuildMfaLevel = Object.freeze({
    [MfaLevels.NONE]: "Not required",
    [MfaLevels.ELEVATED]: "Required to moderate",
});