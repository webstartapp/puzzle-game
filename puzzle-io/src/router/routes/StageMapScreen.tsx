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

declare module '@/hooks/store/useStore' {
  export interface IStore {
    viewer: IUserProfile;
  }
}

type StageMapScreenProps = {
  stage: GameStageID;
};

const StageMapScreen: FC<StageMapScreenProps> = ({ stage }) => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('Guest');
  const [collectedKeys, setCollectedKeys] = useState(0);
  const { state, setState } = useStore();
  const { useCall } = useRestAPI('sessionCalls');

  const stageData = gameStages.find((s) => s.id === stage) as GameStage;

  const { playSong, isPlaying, stopSong } = useSound(adventure, true);
  useAnimatedBackground(stageData.image);
  const { setRoute } = useGameRouter();

  const { data } = useCall('getUser', {});

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
        paths={stageData.scenes.map((scene) => ({
          title: scene.title,
          x: scene.x,
          y: scene.y,
          id: scene.level,
        }))}
        onClick={(stage) => {
          setRoute('WorldMapScreen');
        }}
        image={stageData.image}
      />
    </View>
  );
};

export default StageMapScreen;
