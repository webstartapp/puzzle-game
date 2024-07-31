import { useStore } from '@/hooks/store/useStore';
import { HeaderComponent } from '@/system/gameEngine/GameEngine';
import { Pressable, Text, View } from 'react-native';
import CongratsModal from '../modals/CongratsModal';
import { levels } from '@/config/levels';
import { useMemo } from 'react';

const GameStatusBar: HeaderComponent = ({ dispatchSystem }) => {
  const { data } = useStore('gameView');

  const level = useMemo(() => {
    const levelId = data?.levelId || 'level1';
    return levels[levelId] || levels.level1;
  }, [data?.levelId]);

  const successs = useMemo(() => {
    console.log(
      17,
      data?.matchingEntities?.length,
      level.grid.x * level.grid.y,
    );
    return data?.matchingEntities?.length === level.grid.x * level.grid.y - 1;
  }, [data?.matchingEntities, level.grid.x, level.grid.y]);

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
