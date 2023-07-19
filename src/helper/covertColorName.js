import convert from 'color-convert';
import colorName from "color-name"

export const covertColorName = (color) => {
    // Convert hex to RGB
    const rgb = convert.hex.rgb(color);
    // Find the nearest color name
    let minDistance = Number.MAX_VALUE;
    let closestColorName = '';
    for (const name in colorName) {
        const color = colorName[name];
        const distance = Math.sqrt(
            Math.pow(rgb[0] - color[0], 2) +
            Math.pow(rgb[1] - color[1], 2) +
            Math.pow(rgb[2] - color[2], 2)
        );

        if (distance < minDistance) {
            minDistance = distance;
            closestColorName = name;
        }
    }

    const words = closestColorName.match(/[A-Z]?[a-z]+/g) || [];
    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    // Join the words with spaces
    const readableName = capitalizedWords.join(' ');

    return readableName;
}