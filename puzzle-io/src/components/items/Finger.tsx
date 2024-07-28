import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Image } from 'expo-image';
import {
  IStateEntity,
  PositionWorld,
} from '@/src/system/gameEngine/GameEngine';

const Finger: FC<{
  entity: IStateEntity;
  world: PositionWorld;
}> = ({ entity: { indexes, position, image }, world }) => {
  const styles = StyleSheet.create({
    finger: {
      width: world.width,
      height: world.height,
      position: 'absolute',
      userSelect: 'none',
    },
    text: {
      fontSize: world.width / 2,
      lineHeight: world.height / 2,
      color: 'black',
    },
  });

  // const ImageBody = cropImage(image, {
  //   x: indexes?.x * world.width,
  //   y: indexes?.y * world.height,
  //   width: world.width,
  //   height: world.height,
  // });

  return (
    <View style={[styles.finger]}>
      <Image
        source={image}
        style={{ width: world.width, height: world.height }}
        // @ts-ignore - expo-image type error
        draggable={false}
      />
    </View>
  );
};

export { Finger };
