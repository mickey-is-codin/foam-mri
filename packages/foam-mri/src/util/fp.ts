export const identity = (x: any) : any => x;
export const clipTo = (max: number) => (x: number) => {
  return x > max ? max : x;
};
export const sum = (xs: number[]) => xs.reduce((a,b) => a + b, 0);
export const mean = (xs: number[]) => sum(xs) / xs.length;
export const intMean = (...xs: number[]) => Math.round((sum(xs) / xs.length));
export const allButLast = (xs: any[]) => xs.slice(0,-1);