import { Shade } from "./classes/Shade";

process.loadEnvFile();

new Shade().start();

process.on('uncaughtException', function (err) {
    console.error(err as unknown as string);
}); 
