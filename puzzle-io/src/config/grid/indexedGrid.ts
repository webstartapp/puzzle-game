const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
type DigitType = (typeof digits)[number];
type nonzeroDigit = Exclude<DigitType, 0>;
type GridKeys2 = `${nonzeroDigit}${DigitType}`;

export type Digit = DigitType | Numberify<GridKeys2>;

export type Grid<XD extends Digit = Digit, YD extends Digit = Digit> = {
  x: XD;
  y: YD;
};
const getGrid = (x: number, y: number) => ({ x, y });
type GridKeys<X extends Digit, Y extends Digit> = `${X}x${Y}`;

// Helper type to generate the values
type GridValues<K extends string> = K extends `${infer X}x${infer Y}`
  ? { x: Numberify<X>; y: Numberify<Y> }
  : never;

// Utility type to convert string literal to number
export type Numberify<S extends string> = S extends `${infer N extends number}`
  ? N
  : never;

type Range<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N ? Acc[number] : Range<N, [...Acc, Acc['length']]>;

// Define IndexedGridLocal type based on dynamic range
type IndexedGridLocal<X extends Digit, Y extends Digit> = {
  [K in GridKeys<Range<X>, Range<Y>>]: GridValues<K>;
};

const indexedGridConstructor = <X extends Digit, Y extends Digit>(
  x: X,
  y: Y,
): IndexedGridLocal<X, Y> => {
  const grid = {} as IndexedGridLocal<X, Y>;
  for (let digitX = 0; digitX <= x; digitX++) {
    for (let digitY = 0; digitY <= y; digitY++) {
      const key = `${digitX}x${digitY}` as GridKeys<Range<X>, Range<Y>>;
      grid[key] = getGrid(digitX, digitY) as IndexedGridLocal<X, Y>[typeof key];
    }
  }
  return grid;
};

export const indexedGrid = indexedGridConstructor(50, 50);

export type IndexedGrid = typeof indexedGrid;
export type IndexedGridKeys = keyof IndexedGrid;
