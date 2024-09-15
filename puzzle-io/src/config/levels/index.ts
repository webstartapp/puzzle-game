import { Level } from '@/utils/levelConstructor';
import levelMapping from '@/config/levels/levelInfo.json';
import { indexedGrid, IndexedGridKeys } from '../grid/indexedGrid';
import levelImages from '@/config/levels/levelImages.json';
import { GameStage, gameStages } from '../stages';

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
    const stage = gameStages.find((stageItem) =>
      stageItem.scenes.find((scene) => scene.level === levelKey),
    );
    if (!stage) {
      throw new Error(`No stage found for level ${levelKey}`);
    }
    const sceneId = stage.scenes.findIndex((scene) => scene.level === levelKey);
    if (sceneId < 0) {
      throw new Error(`No scene found for level ${levelKey}`);
    }

    const scene = stage.scenes[sceneId];
    let nextStage: GameStage | undefined = stage;
    let nextSceneId = sceneId + 1;
    let nextLevel = stage.scenes[nextSceneId]?.level;

    if (!nextLevel) {
      nextStage = gameStages.find(
        (stageItem) => stageItem.order === stage.order + 1,
      );
      if (nextStage) {
        nextSceneId = 0;
        nextLevel = nextStage.scenes[nextSceneId]?.level;
      }
    }
    const level: Level<LevelId> = {
      ...levelItem,
      id: levelKey,
      image: (levelImages as Record<string, string>)[levelKey],
      title: scene.title,
      subtitle: scene.description,
      stageId: stage.id,
      sceneId,
      grid: indexedGrid[levelItem.grid as IndexedGridKeys],
      nextLevel: {
        level: nextLevel,
        stageId: nextStage?.id,
      },
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
