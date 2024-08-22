import React, { useState, useEffect, FC } from 'react';
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
  const { setRoute } = useGameRouter();
  const [levelData, setLevelData] = useState<Level>();

  useEffect(() => {
    playSong();
    return () => {
      stopSong();
    };
  }, [playSong]);

  return (
    <View style={layoutStyles.container}>
      <MapStatusBar backTo="WorldMapScreen" />
      <MuteButton
        isMuted={!isPlaying}
        onToggleMute={() => {
          console.log(54, isPlaying);
          isPlaying ? stopSong() : playSong();
        }}
      />
      <PathDrawing
        paths={stageData.scenes.map((scene) => {
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
