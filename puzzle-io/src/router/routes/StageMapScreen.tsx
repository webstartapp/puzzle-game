import React, { useState, useEffect, FC } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeloImage from '@/assets/images/enchanted-forest.jpeg';
import adventure from '@/assets/music/Adventure.mp3';
import { useStore } from '@/hooks/store/useStore';
import { IUserProfile } from '@/_generated/sessionOperations';
import { useAnimatedBackground } from '@/components/animations/AnimatedImage';
import { useSound } from '@/components/basic/Sound';
import { useRestAPI } from '@/components/provider/useRestQueries';
import { MuteButton } from '@/components/icons/MuteButton';
import { layoutStyles } from '@/styles/layoutStyles';
import { useGameRouter } from '../Router';
import PathDrawing from '@/components/path/PathDrawing';
import { GameStage, GameStageID, gameStages } from '@/config/stages';
import { levels } from '@/config/levels';

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

  useEffect(() => {
    playSong();
    return () => {
      stopSong();
    };
  }, [playSong]);

  return (
    <View style={layoutStyles.container}>
      <MuteButton
        isMuted={!isPlaying}
        onToggleMute={() => {
          console.log(54, isPlaying);
          isPlaying ? stopSong() : playSong();
        }}
      />
      <PathDrawing
        paths={stageData.scenes.map((scene) => {
          const levelImage = levels[scene.level].image;
          if (!levelImage) {
            throw new Error(`Level ${scene.level} does not have an image`);
          }
          (scene as any).image = {
            uri: levelImage,
          };
          return {
            title: scene.title,
            x: scene.x,
            y: scene.y,
            id: scene.level,
            data: scene,
          };
        })}
        onClick={({ data }) => {
          console.log(data);
          setRoute('puzzleScreen', { level: data.level });
        }}
        image={stageData.image}
      />
    </View>
  );
};

export default StageMapScreen;
