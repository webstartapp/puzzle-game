import { useStore } from '@/hooks/store/useStore';
import { HeaderComponent } from '@/system/gameEngine/GameEngine';
import { Pressable, Text, View } from 'react-native';

const GameStatusBar: HeaderComponent = ({ dispatchSystem }) => {
  const { data } = useStore('gameView');

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
    </View>
  );
};

export default GameStatusBar;
