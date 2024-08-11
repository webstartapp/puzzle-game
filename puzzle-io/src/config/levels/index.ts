import { Level } from '@/utils/levelConstructor';
import level1 from '@/config/levels/levels/level1';
import level2 from '@/config/levels/levels/level2';
import levelMapping from '@/config/levels/levelInfo.json';
import { indexedGrid, IndexedGridKeys } from '../grid/indexedGrid';

export type LevelRecord = typeof levelMapping;

export type LevelId = keyof LevelRecord;

export type Levels = {
  [K in LevelId]: Level<K>;
};

const levelFN = (levelsIn: LevelRecord): Levels => {
  const out: Partial<Record<LevelId, Level<LevelId>>> = {};
  Object.keys(levelsIn).forEach((key) => {
    const levelKey = key as LevelId;
    const levelItem = levelsIn[levelKey];
    const level: Level<LevelId> = {
      ...levelItem,
      id: levelKey,
      image: level1.image,
      title: level1.title,
      subtitle: level1.subtitle,
      grid: indexedGrid[levelItem.grid as IndexedGridKeys],
      shifts: levelItem.shifts.map(
        (shift) => indexedGrid[shift as IndexedGridKeys],
      ),
    };
    out[levelKey] = level;
  });
  return out as Levels;
};

export const levels = levelFN(levelMapping);
