const Command = require("../../main/classes/command");

module.exports = new Command({
    data: {
        name: "reload",
        description: "Reload all the commands and events",
        defaultPermission: false
    },

    run: async ({ client, interaction }) => {
        for (const file of Object.keys(require.cache).filter(file => !file.includes("node_modules"))) {
            try {
                delete require.cache[file];
            } catch (err) {
                interaction.reply({
                    content: `An error ocurred while relaoding **${file}**: ${err}`,
                    ephemeral: true
                });
            }
        }

        client.loadModules();
        return interaction.reply("Commands and Events reloaded successfully.");
    }
});