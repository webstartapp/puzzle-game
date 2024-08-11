import React, { useState, useEffect } from 'react';
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
import { GameStageID, gameStages } from '@/config/stages';

declare module '@/hooks/store/useStore' {
  export interface IStore {
    viewer: IUserProfile;
  }
}

const IntroScreen = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('Guest');
  const [collectedKeys, setCollectedKeys] = useState(0);
  const { state, setState } = useStore();

  const { playSong, isPlaying, stopSong } = useSound(adventure, true);
  useAnimatedBackground(HeloImage);
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
          isPlaying ? stopSong() : playSong();
        }}
      />
      <PathDrawing
        paths={gameStages.map((stage) => ({
          title: stage.title,
          x: stage.x,
          y: stage.y,
          id: stage.id,
          data: stage,
        }))}
        image={HeloImage}
        onClick={({ data }) => {
          setRoute('StageMapScreen', { stage: data.id as GameStageID });
        }}
      />
    </View>
  );
};

export default IntroScreen;
