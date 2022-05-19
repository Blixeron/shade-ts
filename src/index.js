const Shade = require("./bot/client");

new Shade().start();

process.on("uncaughtException", function (err) {
    console.log("[ERROR] ", err);
});