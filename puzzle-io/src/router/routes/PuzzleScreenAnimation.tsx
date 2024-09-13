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
import { useGameRouter } from '../Router';
import { Text } from 'react-native';
import { layoutStyles } from '@/styles/layoutStyles';

type PuzzleScreenProps = {
  level: LevelId;
  isContinue?: boolean;
};

const PuzzleScreen: FC<PuzzleScreenProps> = ({ level, isContinue }) => {
  const [localEntyties, setLocalEntyties] = useState<Record<string, IEntity>>(
    {},
  );

  const { setState } = useStore('gameView');
  const { setRoute } = useGameRouter();
  const levelData = levels[level];
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    const T = async () => {
      const entities = await initiateGameLevel(level, true);
      setLocalEntyties(entities);
      setState('gameView', {
        moves: [],
        matchingEntities: [],
        levelId: level,
        timeEnds: dayjs()
          .add(levelData.requirements.maxTime.end, 'second')
          .unix(),
        timeNow: dayjs().unix(),
      });
      setAnimationStage(1);
    };
    T();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hideEntities = useCallback(
    (index?: number) => {
      const newEntities = { ...localEntyties };
      Object.keys(newEntities).forEach((key, indexedKey) => {
        if (index !== undefined && index !== indexedKey) return;
        newEntities[key].hidden = true;
      });
      setLocalEntyties(newEntities);
    },
    [localEntyties],
  );

  useEffect(() => {
    if (animationStage === 1) {
      setTimeout(() => {
        hideEntities(0);
        setAnimationStage(2);
      }, 2000);
    }
    if (animationStage === 2) {
      setTimeout(() => {
        setAnimationStage(3);
      }, 5000);
    }
    if (animationStage === 3) {
      hideEntities();
      setTimeout(() => {
        setAnimationStage(4);
      }, 1500);
    }
    if (animationStage === 4) {
      setRoute('puzzleScreen', { level });
    }
  }, [animationStage]);

  return (
    <GameEngine
      system={async (ent) => ent}
      style={{
        backgroundColor: 'rgba(255,255,255,0.4)',
      }}
      entities={localEntyties}
      header={{
        component: GameStatusBar,
        height: 90,
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
      <Text style={layoutStyles.gameStarterText}>
        {animationStage === 1 && 'Ready'}
        {animationStage === 2 && 'Set'}
        {animationStage === 3 && 'Go!'}
      </Text>
    </GameEngine>
  );
};
export default PuzzleScreen;
