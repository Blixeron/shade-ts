export function escapeBold(text: string): string {
    return text.replace("*", "\\*");
}