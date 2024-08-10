import { Asset } from 'expo-asset';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Audio } from 'expo-av';
import { Platform } from 'react-native';

export const useSound = (file: Asset, repeat?: boolean) => {
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadSound = async () => {
      const { sound: playbackObject } = await Audio.Sound.createAsync(file);
      playbackObject.setIsLoopingAsync(repeat || false);
      setSound(playbackObject);
    };
    loadSound();
  }, [file, repeat]);

  const playSong = useCallback(() => {
    sound
      ?.playAsync()
      .then(() => {
        setIsPlaying(true);
        sound?.setIsMutedAsync(false).catch((e) => console.log(29, e));
      })
      .catch((e) => {
        console.log(29, e);
        setIsPlaying(false);
      });
  }, [sound]);
  const pauseSong = useCallback(() => {
    sound
      ?.pauseAsync()
      .then(() => {
        setIsPlaying(false);
      })
      .catch(() => {});
  }, [sound]);
  const stopSong = useCallback(() => {
    sound
      ?.stopAsync()
      .then(() => {
        setIsPlaying(false);
      })
      .catch((e) => {
        console.log(29, e);
      });
  }, [sound]);

  return {
    isPlaying,
    playSong,
    pauseSong,
    stopSong,
  };
};
