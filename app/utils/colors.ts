/**
 * Color utility functions for the application
 */

/**
 * Converts a hex color to RGB values
 * @param hex - Hex color string (e.g., "#10b981")
 * @returns Object with r, g, b values (0-255)
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) {
        throw new Error(`Invalid hex color: ${hex}`);
    }
    return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    };
}

/**
 * Converts RGB values to hex color
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Hex color string (e.g., "#10b981")
 */
function rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(x => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

/**
 * Inverts a hex color
 * @param hex - Hex color string (e.g., "#10b981")
 * @returns Inverted hex color string
 */
export function invertColor(hex: string): string {
    const { r, g, b } = hexToRgb(hex);
    return rgbToHex(255 - r, 255 - g, 255 - b);
}

/**
 * Generates the secondary color by inverting the primary color
 * @param primaryColor - Primary hex color from site config
 * @returns Secondary (inverted) hex color
 */
export function generateSecondaryColor(primaryColor: string): string {
    return invertColor(primaryColor);
}
