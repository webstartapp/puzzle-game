import { IEntity } from '@/src/system/gameEngine/GameEngine';
import GameEngine from '@/src/system/gameEngine/GameEngine';
import { MoveFinger } from '@/src/system/touch/touches';
import { ImageResult } from 'expo-image-manipulator';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
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

const level = levels.level1;

export default function Index() {
  const [localEntyties, setLocalEntyties] = useState<Record<string, IEntity>>(
    {},
  );

  const { setState } = useStore();

  useEffect(() => {
    const T = async () => {
      const entities = await initiateGameLevel('level1');
      setLocalEntyties(entities);
      setState('gameView', {
        moves: [],
        matchingEntities: [],
        levelId: level.id,
      });
    };
    T();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          width: 100 / level.grid.x,
          height: 100 / level.grid.y,
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
}
