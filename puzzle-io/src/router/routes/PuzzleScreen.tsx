import { IEntity } from '@/src/system/gameEngine/GameEngine';
import GameEngine from '@/src/system/gameEngine/GameEngine';
import { MoveFinger } from '@/src/system/touch/touches';
import { ImageResult } from 'expo-image-manipulator';
import { FC, useEffect, useMemo, useState } from 'react';
import { useStore } from '@/hooks/store/useStore';
import GameStatusBar from '@/components/header/GameStatusBar';
import { LevelId, levels } from '@/config/levels';
import { Grid } from '@/config/grid/indexedGrid';
import { initiateGameLevel } from '@/utils/initiateGameLevel';
import dayjs from 'dayjs';
import { Text, View } from 'react-native';
import { layoutStyles } from '@/styles/layoutStyles';
import PuzzleTileModal from '@/components/modals/PuzzleTileModal';
import { Level } from '@/utils/levelConstructor';
import { useGameRouter } from '../Router';
import PuzzleFailModal from '@/components/modals/PuzzleFailModal';

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
  const [timestampStart] = useState(dayjs().unix());
  const [levelData, setLevelData] = useState<Level>();
  const [levelFailData, setLevelFailData] = useState<[Level, number, Grid[]]>();

  const {
    setState,
    data,
    state: { viewer },
  } = useStore('gameView');
  const levelItem = levels[level];
  const { setRoute } = useGameRouter();

  const moves = useMemo(() => {
    return data?.moves || [];
  }, [data?.moves]);

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

  useEffect(() => {
    if (levelFailData) {
      return;
    }
    if (
      moves.length > levelItem.requirements.maxMoves.end ||
      timestampNow - timestampStart > levelItem.requirements.maxTime.end
    ) {
      setLevelFailData([levelItem, timestampNow - timestampStart, moves]);
    }
    if (
      data?.matchingEntities &&
      data.matchingEntities.length === levelItem.grid.x * levelItem.grid.y - 1
    ) {
      setRoute('PuzzleSuccessAnimation', {
        level,
        time: timestampNow - timestampStart,
        moves: data?.moves || [],
      });
    }
  }, [moves, timestampNow, timestampStart]);

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
      ></GameEngine>

      {levelData ? (
        <PuzzleTileModal
          levelData={levelData}
          setLevelData={() => setLevelData(undefined)}
        />
      ) : null}
      {levelFailData ? (
        <PuzzleFailModal
          levelData={levelFailData?.[0]}
          moves={levelFailData?.[2]}
          time={levelFailData?.[1]}
        />
      ) : null}
    </View>
  );
};
export default PuzzleScreen;
