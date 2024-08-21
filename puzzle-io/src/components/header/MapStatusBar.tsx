import { useStore } from '@/hooks/store/useStore';
import { RouterPath, useGameRouter } from '@/router/Router';
import { FC } from 'react';
import { Text, View } from 'react-native';
import Button from '../basic/Button';
import home from '@/assets/images/wooden_icons/sign.png';

type MapSatusBarProps = {
  backTo: RouterPath;
};

const MapStatusBar: FC<MapSatusBarProps> = () => {
  const { data } = useStore('gameView');
  const { setRoute } = useGameRouter();

  return (
    <View>
      <Button
        variant="asset"
        asset={home}
        onPress={() => {
          setRoute('puzzleScreen', { level: data?.levelId });
        }}
        title="Go to Puzzle"
      />
    </View>
  );
};
