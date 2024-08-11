import { IEntity } from '@/src/system/gameEngine/GameEngine';
import GameEngine from '@/src/system/gameEngine/GameEngine';
import { MoveFinger } from '@/src/system/touch/touches';
import { ImageResult } from 'expo-image-manipulator';
import { StatusBar } from 'expo-status-bar';
import { FC, useEffect, useState } from 'react';
import { useStore } from '@/hooks/store/useStore';
import GameStatusBar from '@/components/header/GameStatusBar';
import { LevelId, levels } from '@/config/levels';
import { Grid } from '@/config/grid/indexedGrid';
import { initiateGameLevel } from '@/utils/initiateGameLevel';

declare module '@/system/gameEngine/GameEngine' {
  export interface IEntity {
    indexes: Grid;
    map: Grid;
    image: ImageResult;
  }
  export interface ISystemCustomData {
    type: 'reset' | 'oneBack';
  }
}

declare module '@/hooks/store/useStore' {
  export interface IStore {
    gameView?: {
      moves: Grid[];
      matchingEntities: Grid[];
      levelId: LevelId;
    };
  }
}

type PuzzleScreenProps = {
  level: LevelId;
  isContinue?: boolean;
};

const PuzzleScreen: FC<PuzzleScreenProps> = ({ level, isContinue }) => {
  const [localEntyties, setLocalEntyties] = useState<Record<string, IEntity>>(
    {},
  );

  const { setState } = useStore();
  const levelData = levels[level];

  useEffect(() => {
    const T = async () => {
      const entities = await initiateGameLevel(level);
      console.log(50, entities);
      setLocalEntyties(entities);
      setState('gameView', {
        moves: [],
        matchingEntities: [],
        levelId: level,
      });
    };
    T();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(61, levelData, level);
  return (
    <GameEngine
      system={MoveFinger}
      style={{
        backgroundColor: 'orange',
      }}
      entities={localEntyties}
      header={{
        component: GameStatusBar,
        height: 100,
      }}
      gridSnaps={{
        cell: {
          width: 100 / levelData.grid.x,
          height: 100 / levelData.grid.y,
        },
      }}
      contentSize={{
        width: 100,
        height: 100,
      }}
    >
      <StatusBar hidden={true} />
    </GameEngine>
  );
};
export default PuzzleScreen;
