import { useStore } from '@/hooks/store/useStore';
import { HeaderComponent } from '@/system/gameEngine/GameEngine';
import { Text, View } from 'react-native';
import CongratsModal from '../modals/CongratsModal';
import { levels } from '@/config/levels';
import { useEffect, useMemo, useState } from 'react';
import home from '@/assets/images/wooden_icons/home.png';
import leftArrow from '@/assets/images/wooden_icons/left-arrow.png';
import reload from '@/assets/images/wooden_icons/reload.png';
import { useGameRouter } from '@/router/Router';
import Button from '../basic/Button';
import dayjs from 'dayjs';
import { Level } from '@/utils/levelConstructor';

const GameStatusBar: HeaderComponent = ({ dispatchSystem }) => {
  const { data, setState } = useStore('gameView');
  const [timmer, setTimmer] = useState<NodeJS.Timeout | null>(null);
  const { setRoute } = useGameRouter();

  const level = useMemo(() => {
    const levelId = data?.levelId;
    if (!levelId) {
      return {} as Level;
    }

    return levels[levelId];
  }, [data?.levelId]);

  const [timeLeft, setTimeLeft] = useState<number>();

  useEffect(() => {
    if (timmer) {
      clearInterval(timmer);
    }
    if (data) {
      setTimmer(
        setInterval(() => {
          const left = data.timeEnds - dayjs().unix();
          setTimeLeft(left);
          setState('gameView', {
            ...data,
            timeNow: dayjs().unix(),
          });
        }, 500),
      );
    }
    return () => {
      if (timmer) {
        clearInterval(timmer);
      }
    };
  }, [data?.timeEnds]);

  const successs = useMemo(() => {
    return (
      data?.matchingEntities?.length === level?.grid?.x * level?.grid?.y - 1
    );
  }, [data?.matchingEntities, level?.grid?.x, level?.grid?.y]);

  if (!data) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <Button
          variant="asset"
          asset={home}
          onPress={() => {
            setRoute('StageMapScreen');
          }}
        />
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
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 40,
            lineHeight: 40,
            marginHorizontal: 10,
          }}
        >
          {timeLeft}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Button
          variant="asset"
          asset={leftArrow}
          onPress={() => {
            dispatchSystem({ type: 'oneBack' });
          }}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 40,
            lineHeight: 40,
            marginHorizontal: 10,
          }}
        >
          {level?.requirements?.maxMoves?.end - data.moves.length}
        </Text>
        <Button
          variant="asset"
          asset={reload}
          onPress={() => {
            dispatchSystem({ type: 'reset' });
          }}
        />
      </View>
    </View>
  );
};

export default GameStatusBar;
