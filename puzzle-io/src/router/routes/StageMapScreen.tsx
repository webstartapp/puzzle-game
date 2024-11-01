import React, { useState, useEffect, FC, useMemo } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeloImage from '@/assets/images/enchanted-forest.jpeg';
import adventure from '@/assets/music/Adventure.mp3';
import { useStore } from '@/hooks/store/useStore';
import { ILevel, IUserProfile } from '@/_generated/sessionOperations';
import { useAnimatedBackground } from '@/components/animations/AnimatedImage';
import { useSound } from '@/components/basic/Sound';
import { useRestAPI } from '@/components/provider/useRestQueries';
import { MuteButton } from '@/components/icons/MuteButton';
import { layoutStyles } from '@/styles/layoutStyles';
import { useGameRouter } from '../Router';
import PathDrawing from '@/components/path/PathDrawing';
import { GameStage, GameStageID, gameStages } from '@/config/stages';
import { levels } from '@/config/levels';
import MapStatusBar from '@/components/header/MapStatusBar';
import LevelTileModal from '@/components/modals/LevelTileModal';
import { Level } from '@/utils/levelConstructor';

declare module '@/hooks/store/useStore' {
  export interface IStore {
    viewer: IUserProfile;
  }
}

type StageMapScreenProps = {
  stage: GameStageID;
};

const StageMapScreen: FC<StageMapScreenProps> = ({ stage }) => {
  const stageData = gameStages.find((s) => s.id === stage) as GameStage;

  const { playSong, isPlaying, stopSong } = useSound(adventure, true);
  useAnimatedBackground(stageData.image);
  const [levelData, setLevelData] = useState<Level>();
  const { state } = useStore();

  useEffect(() => {
    playSong();
    return () => {
      stopSong();
    };
  }, [playSong]);

  const openedLevels = useMemo(() => {
    const completedScenes: Record<string, boolean> = {};
    const sessions = state.viewer?.session?.previous || [];
    sessions.forEach((session) => {
      if (session.stage !== stage || !session.completed) {
        return;
      }
      completedScenes[session.levelId] = true;
    });
    const out: Record<string, boolean> = {};
    for (let i = 0; i < stageData.scenes.length; i++) {
      const scene = stageData.scenes[i];
      if (completedScenes[scene.level]) {
        const nextScene = stageData.scenes[i + 1];
        if (nextScene) {
          out[nextScene.level] = true;
        }
        out[scene.level] = true;
      }
    }
    out[stageData.scenes[0].level] = true;
    return out;
  }, [state.viewer?.session?.previous, stageData.scenes, stage]);

  const highLightedId = useMemo(() => {
    return stageData.scenes.findLast((scene) => openedLevels[scene.level])
      ?.level;
  }, [openedLevels, stageData.scenes]);

  return (
    <View style={layoutStyles.container}>
      <MapStatusBar backTo="WorldMapScreen" />
      <MuteButton
        isMuted={!isPlaying}
        onToggleMute={() => {
          isPlaying ? stopSong() : playSong();
        }}
      />
      <PathDrawing
        paths={stageData.scenes
          .filter((scene) => openedLevels[scene.level])
          .map((scene) => {
            const levelItem = levels[scene.level];
            const levelImage = levels[scene.level].image;
            if (!levelImage) {
              throw new Error(`Level ${scene.level} does not have an image`);
            }
            const level: Level = {
              ...levelItem,
              title: scene.title,
              subtitle: scene.description,
            };
            (scene as any).image = {
              uri: levelImage,
            };
            return {
              title: scene.title,
              x: scene.x,
              y: scene.y,
              id: scene.level,
              data: level,
            };
          })}
        onClick={({ data }) => {
          setLevelData(data);
        }}
        image={stageData.image}
        highLightedId={highLightedId}
      />
      <LevelTileModal
        levelData={levelData}
        setLevelData={() => {
          setLevelData(undefined);
        }}
      />
    </View>
  );
};

export default StageMapScreen;
