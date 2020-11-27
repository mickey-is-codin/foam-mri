import { Color } from '../util/types';

const RED_RGB: Color = {
  r: 128,
  g: 0,
  b: 38,
};

const YELLOW_RGB: Color = {
  r: 255,
  g: 255,
  b: 204,
};

const toHex = (x: number): string => {
  const xFloored = Math.floor(x);
  const hex = xFloored.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};
const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
};

const toInterpolate = (startColor: Color, endColor: Color) => (color: string, t: number): number => {
  return startColor[color] + (endColor[color] - startColor[color]) * t;
};

export const toHeatmapColors = (resolution: number, startColor: Color = RED_RGB, endColor: Color = YELLOW_RGB): string[] => {
  const deltaT = 1.0 / resolution;
  const ts: number[] = Array.from({ length: resolution }, (_, ix) => deltaT * ix);
  const interpolator = toInterpolate(startColor, endColor);
  const heatmapColors: string[] = ts.map((t) => {
    const r: number = interpolator('r', t);
    const g: number = interpolator('g', t);
    const b: number = interpolator('b', t);
    return rgbToHex(r,g,b);
  });
  return heatmapColors;
};