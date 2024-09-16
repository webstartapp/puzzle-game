import { IEntity } from '@/src/system/gameEngine/GameEngine';
import GameEngine from '@/src/system/gameEngine/GameEngine';
import { MoveFinger } from '@/src/system/touch/touches';
import { ImageResult } from 'expo-image-manipulator';
import { StatusBar } from 'expo-status-bar';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useStore } from '@/hooks/store/useStore';
import GameStatusBar from '@/components/header/GameStatusBar';
import { LevelId, levels } from '@/config/levels';
import { Grid } from '@/config/grid/indexedGrid';
import { initiateGameLevel } from '@/utils/initiateGameLevel';
import dayjs from 'dayjs';
import { useGameRouter } from '../Router';
import { Animated, View } from 'react-native';
import { Text } from 'react-native';
import { layoutStyles } from '@/styles/layoutStyles';
import { buttonStyles } from '@/styles/buttonStyles';
import { headerStyles } from '@/styles/headerStyles';
import { IGameResult } from '@/_generated/sessionOperations';
import AnimatedNumber from '@/components/animations/AnimatedNumber';
import Button from '@/components/basic/Button';
import AssetIcon from '@/components/icons/AssetIcon';
import CoinIcon from '@/assets/images/wooden_icons/coin.png';
import KeyIcon from '@/assets/images/wooden_icons/key.png';
import {
  coinCalculation,
  gameEndingCalculation,
  keyCalculation,
} from '@/utils/resultCalculation';
import { useRestAPI } from '@/components/provider/useRestQueries';

type PuzzleScreenSuccessProps = {
  level: LevelId;
  time: number;
  moves: Grid[];
};

const PuzzleScreenSuccess: FC<PuzzleScreenSuccessProps> = ({
  level,
  time,
  moves,
}) => {
  const [localEntyties, setLocalEntyties] = useState<Record<string, IEntity>>(
    {},
  );

  const { data, setState, state } = useStore('viewer');
  const [initCoins] = useState(data?.session?.coins || 0);
  const { useMutation, useCall } = useRestAPI('sessionCalls');

  const { setRoute } = useGameRouter();
  const levelData = levels[level];

  const submitResult = useMutation('updateGameStatus');
  const [animationStage, setAnimationStage] = useState(0);
  const showAllEntities = useCallback(() => {
    const newEntities: Record<string, IEntity> = {};
    Object.keys(localEntyties).forEach((key) => {
      const entity = localEntyties[key];
      newEntities[key + '_shown'] = {
        ...entity,
        hidden: false,
      };
    });
    setLocalEntyties(newEntities);
  }, [localEntyties]);

  useEffect(() => {
    const T = async () => {
      const entities = await initiateGameLevel(level, true);
      const out: Record<string, IEntity> = {};
      Object.keys(entities).forEach((key, index) => {
        out[key] = {
          ...entities[key],
          hidden: index === 0,
        };
      });
      const gameResult: IGameResult = {
        levelId: level,
        time,
        moves,
      };
      const updatedViewer = gameEndingCalculation(data, gameResult, initCoins);
      submitResult.mutate([undefined, gameResult]);

      setState('viewer', updatedViewer);
      setLocalEntyties(out);
      setAnimationStage(1);
    };
    T();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (animationStage === 1) {
      setTimeout(() => {
        showAllEntities();
        setAnimationStage(2);
      }, 1000);
    }
    if (animationStage === 2) {
      setTimeout(() => {
        setAnimationStage(3);
      }, 5000);
    }
  }, [animationStage]);

  const keys = useMemo(
    () => keyCalculation(level, moves, time),
    [time, moves, level],
  );
  const coins = useMemo(
    () => coinCalculation(level, moves, time),
    [time, moves, level],
  );

  return (
    <GameEngine
      system={async (ent) => ent}
      style={{
        backgroundColor: 'rgba(255,255,255,0.4)',
      }}
      entities={localEntyties}
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
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.7)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <View
          style={[
            layoutStyles.flexRow,
            {
              padding: 5,
            },
          ]}
        >
          <Text style={headerStyles.whiteText}>Congratilations!</Text>
        </View>
        <View
          style={[
            layoutStyles.flexRow,
            {
              padding: 5,
            },
          ]}
        >
          <AssetIcon
            asset={CoinIcon}
            size={40}
          />
          <AnimatedNumber
            startValue={0}
            targetValue={coins}
            duration={3000}
          />
        </View>
        <View
          style={[
            layoutStyles.flexRow,
            {
              padding: 5,
            },
          ]}
        >
          <AssetIcon
            asset={KeyIcon}
            size={40}
          />
          <AnimatedNumber
            startValue={0}
            targetValue={keys}
            duration={3000}
          />
        </View>
        <Button
          variant="wooden"
          onPress={() => {
            setRoute('StageMapScreen', {
              stage: levelData.nextLevel?.stageId || 'enchanted_forest',
            });
          }}
          title="Continue"
        ></Button>
      </View>
    </GameEngine>
  );
};
export default PuzzleScreenSuccess;
