export const identity = (x: any) : any => x;
export const clipTo = (max: number) => (x: number) => {
  return x > max ? max : x;
};