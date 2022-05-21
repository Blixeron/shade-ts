const Command = require("../../bot/classes/command");
const fs = require("fs");

module.exports = new Command({
    data: {
        name: "reload",
        description: "Reload all the comamnds.",
    },

    run: async ({ client, interaction }) => {
        await interaction.deferReply({ fetchReply: true });

        try {
            for (folder of fs.readdirSync("./src/commands")) {
                for (file of fs.readdirSync(`./src/commands/${folder}`)) {
                    let command = require(`../${folder}/${file}`);
                    delete require.cache[require.resolve(`../${folder}/${file}`)];
                    client.commands.set(command.data, command);
                }
            }

            return interaction.followUp("All the commands reloaded.");
        } catch (err) {
            console.log(err);
            return interaction.followUp("I couldn't reload the commands... Check your terminal for the error log.");
        }
    }
});