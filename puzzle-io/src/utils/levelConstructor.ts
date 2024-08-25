import { Grid } from '@/config/grid/indexedGrid';
import { GameStageID, Scene } from '@/config/stages';

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
  image: string;
  shifts: Grid[];
  stageId: GameStageID;
  sceneId: number;
  nextLevel: {
    level?: string;
    stageId?: GameStageID;
    sceneId?: number;
  };
  requirements: {
    maxMoves: {
      '3keys': number;
      '2keys': number;
      '1key': number;
      end: number;
    };
    maxTime: {
      '3keys': number;
      '2keys': number;
      '1key': number;
      end: number;
    };
  };
};
