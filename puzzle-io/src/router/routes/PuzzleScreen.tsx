import { IEntity } from '@/src/system/gameEngine/GameEngine';
import GameEngine from '@/src/system/gameEngine/GameEngine';
import { MoveFinger } from '@/src/system/touch/touches';
import { ImageResult } from 'expo-image-manipulator';
import { StatusBar } from 'expo-status-bar';
import { FC, useCallback, useEffect, useState } from 'react';
import { useStore } from '@/hooks/store/useStore';
import GameStatusBar from '@/components/header/GameStatusBar';
import { LevelId, levels } from '@/config/levels';
import { Grid } from '@/config/grid/indexedGrid';
import { initiateGameLevel } from '@/utils/initiateGameLevel';
import dayjs from 'dayjs';
import { View } from 'react-native';
import { layoutStyles } from '@/styles/layoutStyles';
import PuzzleTileModal from '@/components/modals/PuzzleTileModal';
import { Level } from '@/utils/levelConstructor';

declare module '@/system/gameEngine/GameEngine' {
  export interface IEntity {
    indexes: Grid;
    map: Grid;
    image: ImageResult;
  }
  export interface ISystemCustomData {
    type: 'reset' | 'oneBack';
  }
  export interface IGameHeaderProps {
    timestampNow: number;
    timestampStart: number;
    showSettings: () => void;
  }
}

export type GameViewState = {
  moves: Grid[];
  matchingEntities: Grid[];
  //timestamp of the end of the game
  timeEnds: number;
  timeNow: number;
  levelId: LevelId;
};

declare module '@/hooks/store/useStore' {
  export interface IStore {
    gameView?: GameViewState;
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
  const [timestampNow, setTimestampNow] = useState(dayjs().unix());
  const [timestampStart, setTimestampStart] = useState(dayjs().unix());
  const [levelData, setLevelData] = useState<Level>();

  const { setState } = useStore('gameView');
  const levelItem = levels[level];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestampNow(dayjs().unix());
    }, 250);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const T = async () => {
      const entities = await initiateGameLevel(level);
      setLocalEntyties(entities);
      setState('gameView', {
        moves: [],
        matchingEntities: [],
        levelId: level,
        timeEnds: dayjs()
          .add(levelItem.requirements.maxTime.end, 'second')
          .unix(),
        timeNow: dayjs().unix(),
      });
    };
    T();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={layoutStyles.container}>
      <GameEngine
        system={MoveFinger}
        style={{
          backgroundColor: 'rgba(255,255,255,0.8)',
        }}
        entities={localEntyties}
        header={{
          component: GameStatusBar,
          height: 90,
          props: {
            timestampNow,
            timestampStart,
            showSettings: () => {
              setLevelData(levelItem);
            },
          },
        }}
        gridSnaps={{
          cell: {
            width: 100 / levelItem.grid.x,
            height: 100 / levelItem.grid.y,
          },
        }}
        contentSize={{
          width: 100,
          height: 100,
        }}
      >
        <StatusBar hidden={true} />
      </GameEngine>

      <PuzzleTileModal
        levelData={levelData}
        setLevelData={() => setLevelData(undefined)}
      />
    </View>
  );
};
export default PuzzleScreen;
