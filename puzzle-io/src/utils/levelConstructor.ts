import { Grid } from '@/config/grid/indexedGrid';

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

type MetaData<INDEX extends string> = {
  id: INDEX;
  title: string;
  subtitle: string;
  image: string;
};

export type Level<T extends string = string> = {
  id: T;
  title: string;
  subtitle: string;
  grid: Grid;
  shifts: { x: number; y: number }[];
};

type LevelConstructorProps<
  INDEX extends string,
  GRID extends Grid,
  SHIFTS extends Grid[],
> = {
  metaData: MetaData<INDEX>;
  grid: GRID;
  shifts: SHIFTS & UniqueObjectArray<SHIFTS>;
};

export const levelConstructor = <
  INDEX extends string,
  GRID extends Grid,
  SHIFTS extends Grid[],
>({
  metaData,
  grid,
  shifts,
}: LevelConstructorProps<INDEX, GRID, SHIFTS>): Level<INDEX> => ({
  ...metaData,
  grid,
  shifts,
});
