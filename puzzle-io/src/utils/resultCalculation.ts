import {
  IGameResult,
  ILevelStats,
  IUserProfile,
} from '@/_generated/sessionOperations';
import { Grid } from '@/config/grid/indexedGrid';
import { LevelId, levels } from '@/config/levels';

export const keyCalculation = (level: LevelId, moves: Grid[], time: number) => {
  const levelItem = levels[level];
  if (!levelItem) return 0;

  if (
    moves.length < levelItem.requirements.maxMoves['3keys'] &&
    time < levelItem.requirements.maxTime['3keys']
  ) {
    return 3;
  }
  if (
    moves.length < levelItem.requirements.maxMoves['2keys'] &&
    time < levelItem.requirements.maxTime['2keys']
  ) {
    return 2;
  }
  if (
    moves.length < levelItem.requirements.maxMoves['1key'] &&
    time < levelItem.requirements.maxTime['1key']
  ) {
    return 1;
  }
  return 0;
};

export const coinCalculation = (
  level: LevelId,
  moves: Grid[],
  time: number,
) => {
  const levelItem = levels[level];
  if (!levelItem) return 0;
  const keys = keyCalculation(level, moves, time);
  const factor =
    levelItem.requirements.maxMoves['3keys'] * 5 +
    levelItem.requirements.maxTime['3keys'];
  const movesCoins =
    (levelItem.requirements.maxMoves['end'] - moves.length) * factor;
  const timeCoins = (levelItem.requirements.maxTime['end'] - time) * factor;
  const keyCoins = keys * factor;
  const totalCoins = movesCoins + timeCoins + keyCoins;

  return Math.ceil(totalCoins / 1000);
};

/**
 * Calculate the game result as an updated user profile
 * @param data - The previous user profile
 * @param gameResult - The result of the game
 * @param initCoins {number} - The initial coins of the user
 * - to avoid iterative calculation of the coins as the state updates, the initial coins are passed separately
 */
export const gameEndingCalculation = (
  data: IUserProfile,
  gameResult: IGameResult,
  initCoins: number,
) => {
  const { levelId, time, moves } = gameResult;
  const keys = keyCalculation(levelId as LevelId, moves as Grid[], time);
  const coins = coinCalculation(levelId as LevelId, moves as Grid[], time);
  const levelData = levels[levelId as LevelId];
  const completed =
    levelData.requirements.maxMoves['end'] >= moves.length &&
    levelData.requirements.maxTime['end'] >= time;
  const existingPrevious: Partial<ILevelStats> =
    data?.session?.previous?.find((prev) => prev.levelId === levelId) || {};

  const previous = {
    ...existingPrevious,
  };

  previous.completed = previous.completed || completed;

  previous.time =
    previous?.time === undefined || previous?.time > time
      ? time
      : previous.time;
  previous.moves =
    previous?.moves === undefined || previous?.moves > moves.length
      ? moves.length
      : previous.moves;

  previous.stars =
    previous.stars === undefined || previous?.stars < keys
      ? keys
      : previous.stars;

  previous.scene = levelData.sceneId;
  previous.stage = levelData.stageId;
  previous.levelId = levelData.id;

  const sessionRest = [...(data?.session?.previous || [])].filter(
    (previous) => previous.levelId !== levelId,
  );
  sessionRest.push(previous as ILevelStats);

  const nextLevel = levelData.nextLevel;

  const nextCurrent =
    data?.session?.current?.levelId !== levelId
      ? {
          completed: false,
          levelId: nextLevel.level,
          time: 0,
          moves: [],
          stars: 0,
          scene: nextLevel.sceneId,
          stage: nextLevel.stageId,
        }
      : undefined;

  const updatedViewer = {
    ...data,
    session: {
      ...data.session,
      previous: sessionRest,
      coins: initCoins + coins,
      current: nextCurrent?.levelId ? nextCurrent : undefined,
    },
  } as IUserProfile;
  return updatedViewer;
};
