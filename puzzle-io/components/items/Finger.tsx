import { IEntity } from '@/system/gameEngine/DefaultRenderer';
import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const RADIUS = 20;

const Finger: FC<{
  entity: IEntity;
  world: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
}> = ({ entity: { indexes, position }, world }) => {
  const styles = StyleSheet.create({
    finger: {
      borderColor: '#CCC',
      borderWidth: 4,
      borderRadius: RADIUS * 2,
      width: world.width,
      height: world.height,
      backgroundColor: 'pink',
      position: 'absolute',
    },
    text: {
      fontSize: world.width / 2,
      lineHeight: world.height / 2,
      color: 'black',
    },
  });

  return (
    <View style={[styles.finger]}>
      <Text style={[styles.text]}>{`${indexes?.x}x${indexes?.y}`}</Text>
    </View>
  );
};

export { Finger };
