import React, { useState, useEffect, useMemo } from 'react';
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
import MapStatusBar from '@/components/header/MapStatusBar';
import StageTileModal from '@/components/modals/StageTileModal';

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
  const [stageData, setStageData] = useState<GameStage>();

  useEffect(() => {
    playSong();
    return () => {
      stopSong();
    };
  }, [playSong]);

  const sessions = useMemo(() => {
    // only unique values
    return (
      state.viewer?.session?.previous
        ?.filter(
          (previousData, index, arr) => arr.indexOf(previousData) === index,
        )
        .filter((previous) => previous.completed) || []
    );
  }, [state.viewer?.session?.previous]);

  const openedStages = useMemo(() => {
    const completedScenes: Record<string, number[]> = {};
    sessions.forEach((session) => {
      if (!completedScenes[session.stage]) {
        completedScenes[session.stage] = [];
      }
      completedScenes[session.stage].push(session.scene);
    });
    const out: Record<string, boolean> = {};
    for (let i = 0; i < gameStages?.length; i++) {
      const stageData = gameStages[i];
      if (completedScenes[stageData.id]?.length === stageData.scenes.length) {
        out[stageData.id] = true;
        const nextStage = gameStages[i + 1];
        if (nextStage) {
          out[nextStage.id] = true;
        }
      }
    }
    out[gameStages[0].id] = true;

    return out;
  }, [sessions]);

  const highLightedId = useMemo(() => {
    return gameStages.findLast((stage) => openedStages[stage.id])?.id;
  }, [openedStages]);

  console.log(72, openedStages);

  return (
    <View style={layoutStyles.container}>
      <MapStatusBar />
      <MuteButton
        isMuted={!isPlaying}
        onToggleMute={() => {
          isPlaying ? stopSong() : playSong();
        }}
      />
      <PathDrawing
        paths={gameStages
          .filter((stage) => openedStages[stage.id])
          .map((stage) => ({
            title: stage.title,
            x: stage.x,
            y: stage.y,
            id: stage.id,
            data: stage,
          }))}
        highLightedId={highLightedId}
        image={HeloImage}
        onClick={({ data }) => {
          setStageData(data);
          //setRoute('StageMapScreen', { stage: data.id as GameStageID });
        }}
      />
      <StageTileModal
        stageData={stageData}
        setStageData={() => {
          setStageData(undefined);
        }}
      />
    </View>
  );
};

export default IntroScreen;
