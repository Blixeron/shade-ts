export namespace Logger {
    export enum Types {
        reset = '\x1B[0m',

        // Formats
        bold = '\x1B[1m',
        italic ='\x1B[3m',
        underline = '\x1B[4m',

        // Colors
        red = '\x1B[38;5;1m',
        green = '\x1B[38;5;2m',
        yellow = '\x1B[38;5;3m',
        blue = '\x1B[38;5;4m',
        pink = '\x1B[38;5;5m',
        cyan = '\x1B[38;5;6m',
    }

    type Formatting = keyof typeof Types;

    /**
     * Formats a given string to use for logging.
     * @param {string} input - The string to format.
     * @param {Formatting | Types} type - The type of the string.
     * @returns {string} The formatted string.
     */
    export function format(input: string, type: Formatting | Types): string {
        return type + input + '\x1B[0m'
    }

    /**
     * Prints a message to the console with a label and time.
     * @param {string} message - The message to print.
     * @param {string} label - The label of the message Defaults to 'INFO' in green.
     * @returns {void}
     */
    export function print({ message, label }: { message: string, label?: string }): void {
        const time = new Date();
        const formattedTime = `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`;

        const labelString = label || format('INFO', 'green');

        return console.log(format(`${formattedTime} ${labelString}   `, 'bold') + message);
    }
}