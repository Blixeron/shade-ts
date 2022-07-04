import { BaseSlashCommand } from "../../../baseCommand";

import { UserAvatarCommand } from "./avatar";
import { UserInformationCommand } from "./information";

export default class UserGroupCommand extends BaseSlashCommand {
    name = "user";
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