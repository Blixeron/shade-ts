const Command = require("../../bot/classes/command");

module.exports = new Command({
    data: {
        name: "reload",
        description: "Reload the Commands and Events files.",
    },

    ownerOnly: true,

    run: async ({ client, interaction }) => {
        for (const file of Object.keys(require.cache).filter(file => !file.includes("node_modules"))) {
            try {
                delete require.cache[file];
            } catch (err) {
                console.log(err);
            }
        }

        client.loadModules();
        return interaction.reply("Commands and Events reloaded successfully.");
    }
});