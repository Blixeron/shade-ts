export function toTitleCase(text: string) {
    const text1 = text[0].toUpperCase();
    const text2 = text.slice(1).toLowerCase();
    return text1 + text2;
}