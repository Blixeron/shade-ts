import { BaseSlashCommand } from "../../../baseCommand";

import { ServerIconCommand } from "./icon";
import { ServerInformationCommand } from "./information";

export default class UserGroupCommand extends BaseSlashCommand {
    name = "server";
    description = "Check things about the current server";

    disableDm = true;

    constructor() {
        super({
            options: [
                new ServerIconCommand(),
                new ServerInformationCommand()
            ],
        });
    }
}