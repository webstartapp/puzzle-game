import React, { FC, useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { Image } from 'expo-image';
import {
  IStateEntity,
  PositionWorld,
} from '@/src/system/gameEngine/GameEngine';

const Finger: FC<{
  entity: IStateEntity;
  world: PositionWorld;
}> = ({ entity: { indexes, position, image, hidden }, world }) => {
  const [opacity] = useState(new Animated.Value(1));

  useEffect(() => {
    if (hidden) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [hidden]);

  const styles = StyleSheet.create({
    finger: {
      width: world.width - 1,
      height: world.height - 1,
      position: 'absolute',
      userSelect: 'none',
      opacity: opacity,
    },
    text: {
      fontSize: world.width / 2,
      lineHeight: world.height / 2,
      color: 'black',
    },
  });

  return (
    <Animated.View style={[styles.finger]}>
      <Image
        source={image}
        style={{ width: world.width - 1, height: world.height - 1 }}
        // @ts-ignore - expo-image type error
        draggable={false}
      />
    </Animated.View>
  );
};

export { Finger };
