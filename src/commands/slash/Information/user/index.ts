import { BaseSlashCommand } from "../../../baseCommand";

import { UserAvatarCommand } from "./avatar";
import { UserInformationCommand } from "./information";

export const COMMAND_NAME = "user";

export default class UserGroupCommand extends BaseSlashCommand {
    name = COMMAND_NAME;
    description = "Check things about a Discord user";

    constructor() {
        super({
            options: [
                new UserInformationCommand(),
                new UserAvatarCommand()
            ],
        });
    }
}