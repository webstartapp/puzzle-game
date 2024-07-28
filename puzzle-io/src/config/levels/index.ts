import { Level } from '@/utils/levelConstructor';
import level1 from '@/config/levels/levels/level1';
import level2 from '@/config/levels/levels/level2';

const levelList = [level1, level2];

export type LevelId = (typeof levelList)[number]['id'];

export type LevelRecord = {
  [K in LevelId]: Level<K>;
};

export const levels = levelList.reduce((acc, level) => {
  acc[level.id as 'level1'] = level as Level<'level1'>;
  return acc;
}, {} as LevelRecord);
