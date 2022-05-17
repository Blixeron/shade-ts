## Command Example 
Here's an example of how a command would look like.

```ts
import { Command } from "../../bot/classes/command";

export default new Command({
    data: {
        name: "the_command_name",
        description: "The command description.",
        options: [
            {
                name: "the_option_name",
                description: "The option description.",
                type: "The type of this option, refer to https://github.com/BlixerDev/shade/blob/main/examples/optionTypes.md",
                required: true or false // If the option should be required to run the command or not.
            }
        ]
    },

    // Neither ownerOnly or userPermissions are required for your command.
    ownerOnly: true or false,
    userPermissions: ["Array of the permissions that a user needs to run this command."],

    // Run Function, where you can assign the parameters you want to use in the command. They're declared in https://github.com/BlixerDev/shade/blob/main/src/bot/classes/command.ts
    run: async ({ client, interaction }) => {
        // Command code, do whatever you want here.
        
        // If you need to get an option's value, you may want to use the getType method,
        // "Type" being the type of option you want to get the value of, for example. getString.
        interaction.options.getType("The option name.");

        // As Slash Commands are handled as an interaction, you might want to reply when it gets triggered,
        // and there's some methods you can use for that:
        interaction.reply() // A simple reply method you can pass options inside, like ({ enbeds: })
        interaction.deferReply({ fetchReply: true }) // For tasks that need more than 3 seconds, meant to be used with followUp().
        interaction.followUp() // Works the same as reply(), but you use this one when deferReply() was used before.
    }
});
```