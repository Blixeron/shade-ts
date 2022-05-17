// Importing the custom client.
import { Shade } from "./bot/client";

// Creating a new instance of it.
new Shade().start();

// Handling process errors that could occur.
process.on("uncaughtException", function (err) {
    console.log("[ERROR] ", err);
});