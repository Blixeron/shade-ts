import { ShadeCluster } from "./cluster";

new ShadeCluster().start();

process.on("uncaughtException", function (err) {
    console.log("Oops, looks like I had a problem: ", err);
});
