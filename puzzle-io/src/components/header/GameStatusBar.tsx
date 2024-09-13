import { useStore } from '@/hooks/store/useStore';
import { HeaderComponent } from '@/system/gameEngine/GameEngine';
import { Text, View } from 'react-native';
import CongratsModal from '../modals/CongratsModal';
import { LevelId, levels } from '@/config/levels';
import { useEffect, useMemo, useState } from 'react';
import home from '@/assets/images/wooden_icons/sign.png';
import leftArrow from '@/assets/images/wooden_icons/left-arrow.png';
import settiongs from '@/assets/images/wooden_icons/settings.png';
import { useGameRouter } from '@/router/Router';
import Button from '../basic/Button';
import dayjs from 'dayjs';
import { Level } from '@/utils/levelConstructor';
import { HederTextView } from '../basic/TextView';
import { KeyGainChain } from './visuals/KeyGainChain';
import { headerStyles } from '@/styles/headerStyles';
import { keyCalculation } from '@/utils/resultCalculation';

const GameStatusBar: HeaderComponent = ({
  dispatchSystem,
  timestampNow,
  timestampStart,
  showSettings,
}) => {
  const { data } = useStore('gameView');

  const level = useMemo(() => {
    const levelId = data?.levelId;
    if (!levelId) {
      return {} as Level;
    }

    return levels[levelId];
  }, [data?.levelId]);

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

    const time = (timestampNow || 0) - (timestampStart || 0);
    return keyCalculation(level.id as LevelId, data?.moves || [], time);
  }, [data?.moves?.length, level?.requirements, timestampNow, timestampStart]);

  const timeLeft = useMemo(() => {
    const levelLimits = level?.requirements;
    if (!levelLimits) {
      return 0;
    }

    const time = (timestampNow || 0) - (timestampStart || 0);
    if (time < 0) {
      return levelLimits.maxTime.end;
    }
    if (time > levelLimits.maxTime.end) {
      return 0;
    }
    return levelLimits.maxTime.end - time;
  }, [level?.requirements, timestampNow, timestampStart]);

  if (!data) {
    return null;
  }

  return (
    <View style={headerStyles.wrapper}>
      <HederTextView text={' '} />
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
          justifyContent: 'flex-end',
          width: 200,
        }}
      >
        {data.moves.length ? (
          <Button
            variant="asset"
            asset={leftArrow}
            onPress={() => {
              dispatchSystem({ type: 'oneBack' });
            }}
          />
        ) : null}
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
        {showSettings ? (
          <Button
            variant="asset"
            asset={settiongs}
            onPress={() => {
              showSettings();
            }}
          />
        ) : null}
      </View>
    </View>
  );
};

export default GameStatusBar;
