import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeloImage from '@/assets/images/welcome_screen.jpeg';
import introScreen from '@/assets/music/intro_screen_bg.mp3';
import { useStore } from '@/hooks/store/useStore';
import { IUserProfile } from '@/_generated/sessionOperations';
import {
  AnimatedImage,
  useAnimatedBackground,
} from '@/components/animations/AnimatedImage';
import Button from '@/components/basic/Button';
import { useSound } from '@/components/basic/Sound';
import { useRestAPI } from '@/components/provider/useRestQueries';
import { MuteButton } from '@/components/icons/MuteButton';
import { layoutStyles } from '@/styles/layoutStyles';
import { useGameRouter } from '../Router';

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

  const { data } = useCall('getUser', {});

  console.log(data);

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
        {state?.viewer?.session?.current?.moves?.length ? (
          <Button
            title="Continue"
            onPress={() => {
              // Handle Continue Progress
            }}
            variant="default"
          />
        ) : null}
        <Button
          title="New Game"
          onPress={() => {
            setRoute('stageScreen');
          }}
          variant="default"
        />
        <Button
          title="Load Game"
          onPress={() => {
            // Handle Load Saved Game
          }}
          variant="default"
        />
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   backgroundImage: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//   },
//   header: {
//     position: 'absolute',
//     top: 50,
//     left: 20,
//     right: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   username: {
//     fontSize: 18,
//     color: 'white',
//   },
//   keysContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   keyIcon: {
//     width: 20,
//     height: 20,
//     marginRight: 5,
//   },
//   keysCount: {
//     fontSize: 18,
//     color: 'white',
//   },
//   buttonsContainer: {
//     position: 'absolute',
//     bottom: 100,
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     marginVertical: 10,
//     borderRadius: 10,
//   },
//   buttonText: {
//     fontSize: 18,
//     color: 'white',
//   },
// });

export default IntroScreen;
