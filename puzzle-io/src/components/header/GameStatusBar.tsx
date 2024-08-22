import { useStore } from '@/hooks/store/useStore';
import { HeaderComponent } from '@/system/gameEngine/GameEngine';
import { Text, View } from 'react-native';
import CongratsModal from '../modals/CongratsModal';
import { levels } from '@/config/levels';
import { useEffect, useMemo, useState } from 'react';
import home from '@/assets/images/wooden_icons/sign.png';
import leftArrow from '@/assets/images/wooden_icons/left-arrow.png';
import reload from '@/assets/images/wooden_icons/reload.png';
import { useGameRouter } from '@/router/Router';
import Button from '../basic/Button';
import dayjs from 'dayjs';
import { Level } from '@/utils/levelConstructor';
import { HederTextView } from '../basic/TextView';
import { KeyGainChain } from './visuals/KeyGainChain';
import { headerStyles } from '@/styles/headerStyles';

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

  const activeKeys = useMemo(() => {
    const levelLimits = level?.requirements;

    if (!levelLimits) {
      return 3;
    }

    const time =
      levelLimits.maxTime.end - (data?.timeEnds || 0) + (data?.timeNow || 0);
    if (
      (data?.moves?.length || 0) < levelLimits.maxMoves['3keys'] &&
      time < levelLimits.maxTime['3keys']
    ) {
      return 3;
    }
    if (
      (data?.moves?.length || 0) < levelLimits.maxMoves['2keys'] &&
      time < levelLimits.maxTime['2keys']
    ) {
      return 2;
    }
    if (
      (data?.moves?.length || 0) < levelLimits.maxMoves['1key'] &&
      time < levelLimits.maxTime['1key']
    ) {
      return 1;
    }
    return 0;
  }, [data?.moves?.length, data?.timeNow, level?.requirements]);

  if (!data) {
    return null;
  }

  return (
    <View style={headerStyles.wrapper}>
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
      <HederTextView text={level?.title} />
      <HederTextView
        text={timeLeft}
        format="time"
      >
        <KeyGainChain activeKeys={activeKeys} />
      </HederTextView>
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
