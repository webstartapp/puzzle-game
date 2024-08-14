import {
  GameEngineSystem,
  IStateEntity,
} from '@/src/system/gameEngine/GameEngine';
import {
  getStoreData,
  dispatchStoreData,
} from '@/components/provider/StoreProvider';
import { Digit, Grid } from '@/config/grid/indexedGrid';
import { levels } from '@/config/levels';
import { initiateGameLevel } from '@/utils/initiateGameLevel';
import dayJS from 'dayjs';

const addToCache = async (entity: Grid, matchingEntities: Grid[]) => {
  const previousEntities = getStoreData() || {};
  if (!previousEntities.gameView) {
    return;
  }
  previousEntities.gameView.moves.push(entity);
  previousEntities.gameView.matchingEntities = matchingEntities;
  dispatchStoreData('gameView', previousEntities.gameView);
};

const MoveFinger: GameEngineSystem = async (entities, event) => {
  const mapToString = (map: Grid) => `${map.x}-${map.y}`;
  const ocupiedCells = entities.map((entity) => mapToString(entity.map));
  const storeData = getStoreData() || {};
  const gameView = storeData.gameView;
  if (!gameView) {
    return;
  }

  const level = levels[gameView.levelId];

  if (event.type === 'custom') {
    if (event?.customData?.type === 'reset') {
      const previousEntities = getStoreData() || {};
      if (!previousEntities.gameView) {
        return;
      }
      const newEntites = await initiateGameLevel(
        previousEntities.gameView.levelId,
      );
      if (!newEntites) return undefined;
      const mapped: IStateEntity[] = Object.keys(newEntites).map((key) => {
        const entity: IStateEntity = {
          ...newEntites[key],
          eventStartPosition: {
            ...newEntites[key].position,
          },
          key,
        };
        dispatchStoreData('gameView', {
          moves: [],
          matchingEntities: [],
          levelId: level.id,
          timeEnds: dayJS()
            .add(level.requirements.maxTime.end, 'second')
            .unix(),
          timeNow: dayJS().unix(),
        });
        return entity;
      });
      return mapped;
    }
    if (event?.customData?.type === 'oneBack') {
      const previousEntities = getStoreData() || {};
      if (!previousEntities.gameView) {
        return;
      }
      const moves = previousEntities.gameView.moves;
      const matchingEntities = previousEntities.gameView.matchingEntities;
      if (moves.length === 0) {
        return;
      }
      const lastMove = moves[moves.length - 1];
      const mappedEntities: string[] = entities.map((entity) =>
        mapToString(entity.map),
      );
      const emptyCell: Partial<Grid> = {};

      Array.from({ length: level.grid.x }).forEach((_, x) => {
        Array.from({ length: level.grid.y }).forEach((_, y) => {
          if (
            !mappedEntities.includes(
              mapToString({ x: x as Digit, y: y as Digit }),
            )
          ) {
            emptyCell.x = x as Digit;
            emptyCell.y = y as Digit;
          }
        });
      });
      moves.pop();
      const newEntites = entities.map((entity) => {
        if (entity.map.x === lastMove.x && entity.map.y === lastMove.y) {
          const new_key = `${entity.key.split('x')[0]}x${Math.random()}`;
          return {
            ...entity,
            map: emptyCell as Grid,
            position: {
              ...entity.position,
              x: emptyCell.x as number,
              y: emptyCell.y as number,
            },
            key: new_key,
          };
        }
        return entity;
      });
      dispatchStoreData('gameView', {
        moves,
        matchingEntities,
        levelId: level.id,
        timeEnds: previousEntities.gameView.timeEnds,
        timeNow: previousEntities.gameView.timeNow,
      });
      return newEntites;
    }

    return undefined;
  }

  if (!event.entity || !event.touch) {
    return entities;
  }

  const newMap: Grid = {
    x: Math.floor(event.touch.moveX) as Digit,
    y: Math.floor(event.touch.moveY) as Digit,
  };
  const isOccupied =
    event.touch.moveX <= 0 ||
    event.touch.moveY <= 0 ||
    event.touch.moveX > 5 ||
    event.touch.moveY > 5 ||
    ocupiedCells.filter((cell) => cell === mapToString(newMap)).length > 0;
  const new_key = `${event.entity.key.split('x')[0]}x${Math.random()}`;

  const newEntites = entities.map((entity) => {
    if (entity.key === event.entity?.key) {
      if (event.type === 'start') {
        return {
          ...entity,
          eventStartPosition: {
            ...entity.position,
          },
          position: {
            ...entity.position,
            z: 99,
          },
        };
      }
      if (event.type === 'end') {
        return {
          ...entity,
          position: {
            ...entity.position,
            z: 1,
            x: isOccupied
              ? entity.eventStartPosition.x
              : Math.floor(event.touch?.moveX || 0),
            y: isOccupied
              ? entity.eventStartPosition.y
              : Math.floor(event.touch?.moveY || 0),
          },
          map: isOccupied ? entity.map : newMap,
          key: isOccupied ? entity.key : new_key,
        };
      }
      return {
        ...entity,
        position: {
          ...entity.position,
          x: event.touch?.x || 0,
          y: event.touch?.y || 0,
        },
      };
    }
    return entity;
  });
  if (!isOccupied && event.type === 'end') {
    const matchingEntities = newEntites
      .filter(
        (entity) =>
          entity.position.x === entity.indexes.x &&
          entity.position.y === entity.indexes.y,
      )
      .map((entity) => entity.indexes);
    const move = {
      x: newMap.x,
      y: newMap.y,
    };
    addToCache(move, matchingEntities);
  }
  return newEntites;
};

export { MoveFinger };
