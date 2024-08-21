export type TintColorType<T extends string> = {
  color: string;
  alpha: number;
  id: T;
};

const tintColorsFN = <T extends string>(colors: TintColorType<T>[]) => {
  const out: Record<T, TintColorType<T>> = {} as any;
  colors.forEach((color) => {
    out[color.id] = color;
  });
  return out;
};
export const tintColors = tintColorsFN([
  {
    id: 'gray',
    color: '#666666',
    alpha: 0.3,
  },
]);
export type TintColors = keyof typeof tintColors;
