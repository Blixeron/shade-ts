module.exports = function toCase(text) {
    let text1 = text[0]?.toUpperCase();
    let text2 = text.slice(1)?.toLowerCase();
    return text1 + text2;
};