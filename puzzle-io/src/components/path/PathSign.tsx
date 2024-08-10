import { FC } from 'react';
import Arrow from '@/assets/images/paths/rectangle-sign.png';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type PathSignProps = {
  x: number;
  y: number;
  label: string;
  onClick: () => void;
  scale: number;
};

export const PathSign: FC<PathSignProps> = ({
  x,
  y,
  label,
  onClick,
  scale,
}) => {
  const style = StyleSheet.create({
    container: {
      position: 'absolute',
      left: x,
      top: y,
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
      top: 50 * scale,
      width: 40 + 50 * scale,
      textAlign: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  });
  return (
    <TouchableOpacity
      onPress={onClick}
      style={style.container}
    >
      <Image
        source={Arrow}
        style={{
          width: 50 * scale,
          height: 50 * scale,
        }}
      />
      <Text style={style.text}>{label || 'Missing'}</Text>
    </TouchableOpacity>
  );
};
