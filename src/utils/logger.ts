export namespace Logger {
    export class Formatting {
        static reset = '\x1B[0m';

        // Formats
        static bold = '\x1B[1m';
        static italic = '\x1B[3m';
        static underline = '\x1B[4m';

        // Colors
        static red = '\x1B[38;5;1m';
        static green = '\x1B[38;5;2m';
        static yellow = '\x1B[38;5;3m';
        static blue = '\x1B[38;5;4m';
        static pink = '\x1B[38;5;5m';
        static cyan = '\x1B[38;5;6m';
    }

    export function log({ message, label, color }: { message: string; label?: string; color?: string; }) {
        const time = new Date();
        const formattedTime = `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`;

        const labelColor = color || Formatting.green;
        const labelString = label || 'INFO';

        return console.log(Formatting.bold + `${formattedTime} ${labelColor}${labelString}   ` + Formatting.reset, message);
    }
}