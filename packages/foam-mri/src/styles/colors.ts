const RED_RGB: { [key: string]: any } = {
  r: 128,
  g: 0,
  b: 38,
};
const YELLOW_RGB: { [key: string]: any } = {
  r: 255,
  g: 255,
  b: 204,
};

const toHex = (x: number) => {
  const xFloored = Math.floor(x);
  const hex = xFloored.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};
const rgbToHex = (r: number, g: number, b: number) => {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
};
const toInterpolate = (color: string, t: number): any => RED_RGB[color] + (YELLOW_RGB[color] - RED_RGB[color]) * t;

export const toHeatmapColors = (resolution: number) => {
  const deltaT = 1.0 / resolution;
  const ts = Array.from({ length: resolution }, (_, ix) => deltaT * ix);
  const heatmapColors = ts.map((t) => {
    const r = toInterpolate('r', t);
    const g = toInterpolate('g', t);
    const b = toInterpolate('b', t);
    return rgbToHex(r,g,b);
  });
  return heatmapColors;
};