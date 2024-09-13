import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeloImage from '@/assets/images/welcome_screen.jpeg';
import introScreen from '@/assets/music/intro_screen_bg.mp3';
import { useStore } from '@/hooks/store/useStore';
import { IUserProfile } from '@/_generated/sessionOperations';
import { useAnimatedBackground } from '@/components/animations/AnimatedImage';
import Button from '@/components/basic/Button';
import { useSound } from '@/components/basic/Sound';
import { useRestAPI } from '@/components/provider/useRestQueries';
import { MuteButton } from '@/components/icons/MuteButton';
import { layoutStyles } from '@/styles/layoutStyles';
import { useGameRouter } from '../Router';
import { LevelId, levels } from '@/config/levels';
import { coinCalculation } from '@/utils/resultCalculation';
import { Grid } from '@/config/grid/indexedGrid';

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
  const { useCall } = useRestAPI('sessionCalls');

  const { playSong, isPlaying, stopSong } = useSound(introScreen, true);
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
          console.log(54, isPlaying);
          isPlaying ? stopSong() : playSong();
        }}
      />
      <View style={layoutStyles.centeredContiner}>
        <Button
          title="New Game"
          onPress={() => {
            setRoute('WorldMapScreen');
          }}
        />
      </View>
    </View>
  );
};

export default IntroScreen;
