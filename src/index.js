const Shade = require("./main/client");
new Shade().start();

process.on("uncaughtException", function (err) {
    console.log("Oops, looks like I had a problem: ", err);
});