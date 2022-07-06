import { BaseSlashCommand } from "../../../baseCommand";
import { GitHubAccountCommand } from "./account";

export default class GitHubGroupCommand extends BaseSlashCommand {
    name = "github";
    description = "Check information on GitHub";

    constructor() {
        super({
            options: [
                new GitHubAccountCommand()
            ]
        });
    }
}