import { useStore } from '@/hooks/store/useStore';
import { HeaderComponent } from '@/system/gameEngine/GameEngine';
import { Pressable, Text, View } from 'react-native';
import CongratsModal from '../modals/CongratsModal';
import { LevelId, levels } from '@/config/levels';
import { useMemo } from 'react';

const GameStatusBar: HeaderComponent = ({ dispatchSystem }) => {
  const { data } = useStore('gameView');

  const level = useMemo(() => {
    const levelId = data?.levelId;
    if (!levelId) {
      return {} as any;
    }

    return levels[levelId];
  }, [data?.levelId]);

  const successs = useMemo(() => {
    return (
      data?.matchingEntities?.length === level?.grid?.x * level?.grid?.y - 1
    );
  }, [data?.matchingEntities, level?.grid?.x, level?.grid?.y]);

  console.log(24, data);

  if (!data) {
    return null;
  }

  return (
    <View>
      <Text>{data?.moves?.length || 0}</Text>
      <Text>{data?.matchingEntities?.length || 0}</Text>
      <Pressable
        onPress={() => {
          dispatchSystem({ type: 'reset' });
        }}
      >
        <Text>Reset</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          dispatchSystem({ type: 'oneBack' });
        }}
      >
        <Text>Back</Text>
      </Pressable>
      <CongratsModal
        coins={10}
        stars={1}
        time={100}
        turns={10}
        visible={successs}
        onContinue={() => {
          dispatchSystem({ type: 'reset' });
        }}
      />
    </View>
  );
};

export default GameStatusBar;
