type HasDuplicates<T extends readonly { x: number; y: number }[]> =
  T extends readonly [infer F, ...infer R]
    ? F extends { x: infer FX; y: infer FY }
      ? { x: FX; y: FY } extends R[number]
        ? true
        : R extends readonly { x: number; y: number }[]
          ? HasDuplicates<R>
          : true
      : false
    : false;

type UniqueObjectArray<T extends readonly { x: number; y: number }[]> =
  HasDuplicates<T> extends true ? never : T;

type Level<T extends string = string> = {
  id: T;
  name: string;
  grid: {
    x: number;
    y: number;
  };
  shifts: { x: number; y: number }[];
};

const levelConstructor = <
  GRID extends {
    x: number;
    y: number;
  },
  SHIFTS extends { x: number; y: number }[],
>(
  grid: GRID,
  shifts: SHIFTS & UniqueObjectArray<SHIFTS>,
): Level => ({
  id: 'level1',
  name: 'Level 1',
  grid,
  shifts,
});

export const levels = {
  level1: levelConstructor(
    {
      x: 5,
      y: 5,
    } as const,
    [
      {
        x: 1,
        y: 1,
      },
      {
        x: 2,
        y: 2,
      },
      {
        x: 3,
        y: 3,
      },
    ] as const,
  ),
};
