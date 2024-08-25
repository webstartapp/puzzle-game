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
import { ILevelStats, IUserProfile } from '@/_generated/sessionOperations';
import AnimatedNumber from '@/components/animations/AnimatedNumber';
import Button from '@/components/basic/Button';
import AssetIcon from '@/components/icons/AssetIcon';
import CoinIcon from '@/assets/images/wooden_icons/coin.png';
import KeyIcon from '@/assets/images/wooden_icons/key.png';

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

  const { setRoute } = useGameRouter();
  const levelData = levels[level];
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

  console.log(59, state);

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
      setLocalEntyties(out);
      setAnimationStage(1);
    };
    T();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (animationStage === 1) {
      const existingPrevious: Partial<ILevelStats> =
        data?.session?.previous?.find((prev) => prev.levelId === level) || {};
      existingPrevious.completed =
        existingPrevious.completed ||
        (moves.length < levelData.requirements.maxMoves.end &&
          time < levelData.requirements.maxTime.end);
      existingPrevious.time =
        (existingPrevious?.time || 99999999) > time
          ? time
          : existingPrevious.time;
      existingPrevious.moves =
        (existingPrevious?.moves || 99999999) > moves.length
          ? moves.length
          : existingPrevious.moves;
      existingPrevious.stars =
        (existingPrevious?.stars || 99999999) > keys
          ? keys
          : existingPrevious.stars;
      existingPrevious.scene = levelData.sceneId;
      existingPrevious.stage = levelData.stageId;
      existingPrevious.levelId = levelData.id;
      const extractedViewerPrevious = [
        ...(data?.session?.previous || []),
      ].filter((previous) => previous.levelId !== level);
      extractedViewerPrevious.push(existingPrevious as ILevelStats);

      const nextLevel = levelData.nextLevel;

      const nextCurrent =
        data?.session?.current?.levelId !== level
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
          previous: extractedViewerPrevious,
          coins: initCoins + coints,
          current: nextCurrent?.levelId ? nextCurrent : undefined,
        },
      } as IUserProfile;

      setState('viewer', updatedViewer);
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

  const keys = useMemo(() => {
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
  }, [time, moves.length, level]);

  const coints = useMemo(() => {
    const factor =
      levelData.requirements.maxMoves.end * 5 +
      levelData.requirements.maxTime.end;
    return keys * factor + factor;
  }, [keys]);

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
            targetValue={coints}
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
