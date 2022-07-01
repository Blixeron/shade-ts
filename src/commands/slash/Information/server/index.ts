import { BaseSlashCommand } from "../../../baseCommand";

import { ServerIconCommand } from "./icon";

export const COMMAND_NAME = "server";

export default class UserGroupCommand extends BaseSlashCommand {
    name = COMMAND_NAME;
    description = "Check things about the current server";

    disableDm = true;

    constructor() {
        super({
            options: [
                new ServerIconCommand()
            ],
        });
    }
}