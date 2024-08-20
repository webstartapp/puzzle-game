import { FC } from 'react';
import Arrow from '@/assets/images/wooden_icons/rectangle-sign.png';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PathCheckpoint } from './PathDrawing';

type PathSignProps = {
  x: number;
  y: number;
  title: string;
  onClick: (checkpoint: PathCheckpoint<any>) => void;
  scale: number;
  id: string;
  data: any;
};

export const PathSign: FC<PathSignProps> = ({
  x,
  y,
  title,
  onClick,
  scale,
  id,
  data,
}) => {
  const scaledSize = 120 * scale;
  const style = StyleSheet.create({
    container: {
      position: 'absolute',
      left: x - scaledSize / 2,
      top: y - scaledSize / 2,
      zIndex: 10,
    },
    text: {
      position: 'absolute',
      fontSize: 15 * scale,
      fontWeight: 'bold',
      lineHeight: 18 * scale,
      color: 'white',
      zIndex: 10,
      left: -20,
      top: scaledSize,
      width: 40 + scaledSize,
      textAlign: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  });
  return (
    <TouchableOpacity
      onPress={() => onClick({ x, y, title, id, data })}
      style={style.container}
    >
      <Image
        source={data?.image}
        style={{
          width: scaledSize - 12,
          height: scaledSize - 12,
          top: 6,
          left: 6,
          position: 'absolute',
        }}
      />
      <Image
        source={Arrow}
        style={{
          width: scaledSize,
          height: scaledSize,
        }}
      />
      <Text style={style.text}>{title || 'Missing'}</Text>
    </TouchableOpacity>
  );
};
