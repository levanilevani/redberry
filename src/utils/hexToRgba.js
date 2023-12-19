export function hexToRgba(hex, opacity) {
  // Remove the hash character if present
  hex = hex.replace(/^#/, '');

  // Parse the hex values for red, green, and blue
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Construct the RGBA string
  const rgbaValue = `rgba(${r}, ${g}, ${b}, ${opacity})`;

  return rgbaValue;
}
