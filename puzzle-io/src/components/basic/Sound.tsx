import { Asset } from 'expo-asset';
import { useCallback, useEffect, useState } from 'react';

import { Audio } from 'expo-av';

export const useSound = (file: Asset, repeat?: boolean) => {
  const [sound, setSound] = useState<Audio.Sound>();

  useEffect(() => {
    const loadSound = async () => {
      const { sound: playbackObject } = await Audio.Sound.createAsync(file);
      playbackObject.setIsLoopingAsync(repeat || false);
      setSound(playbackObject);
    };
    loadSound();
  }, [file, repeat]);

  const playSong = useCallback(() => {
    sound?.playAsync();
  }, [sound]);
  const pauseSong = useCallback(() => {
    sound?.pauseAsync();
  }, [sound]);
  const stopSong = useCallback(() => {
    sound?.stopAsync();
  }, [sound]);

  return {
    playSong,
    pauseSong,
    stopSong,
  };
};
