import { Level } from '@/utils/levelConstructor';
import levelMapping from '@/config/levels/levelInfo.json';
import { indexedGrid, IndexedGridKeys } from '../grid/indexedGrid';
import levelImages from '@/assets/static/levelImages.json';

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
      image: (levelImages as Record<string, string>)[levelKey],
      title: '',
      subtitle: '',
      grid: indexedGrid[levelItem.grid as IndexedGridKeys],
      shifts: levelItem.shifts.map(
        (shift) => indexedGrid[shift as IndexedGridKeys],
      ),
      requirements: levelItem.requirements,
    };
    out[levelKey] = level;
  });
  return out as Levels;
};

export const levels = levelFN(levelMapping);
