import { Shade } from "./classes/Shade";
import { Logger } from "./utils/Logger";

process.loadEnvFile();

new Shade().start();

process.on('uncaughtException', function (err) {
    Logger.print({
        message: err as unknown as string,
        label: Logger.format('ERROR', 'red')
    });
}); 
