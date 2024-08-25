import { FC } from 'react';
import Arrow from '@/assets/images/wooden_icons/arrow.png';
import { Image, StyleSheet, Text, View } from 'react-native';

type PathArrowProps = {
  x: number;
  y: number;
  rotation: number;
  scale: number;
};

export const PathArrow: FC<PathArrowProps> = ({ x, y, rotation, scale }) => {
  const style = StyleSheet.create({
    container: {
      position: 'absolute',
      left: x - scale * 15,
      top: y - scale * 15,
    },
    text: {
      fontSize: 20,
      lineHeight: 20,
      color: 'white',
    },
  });
  return (
    <View style={style.container}>
      <Image
        source={Arrow}
        style={{
          width: 30 * scale,
          height: 30 * scale,
          transform: [{ rotate: `${rotation}rad` }],
        }}
      />
    </View>
  );
};
