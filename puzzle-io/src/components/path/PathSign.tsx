import { FC, useEffect, useRef } from 'react';
import Arrow from '@/assets/images/wooden_icons/rectangle-sign.png';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PathCheckpoint } from './PathDrawing';

type PathSignProps = {
  x: number;
  y: number;
  title: string;
  onClick: (checkpoint: PathCheckpoint<any>) => void;
  scale: number;
  id: string;
  data: any;
  highLighted?: boolean;
};

export const PathSign: FC<PathSignProps> = ({
  x,
  y,
  title,
  onClick,
  scale,
  id,
  data,
  highLighted,
}) => {
  const animatedValue = useRef(new Animated.Value(1)).current;
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
      fontSize: 18 * scale,
      fontWeight: 'bold',
      lineHeight: 20 * scale,
      padding: 5,
      color: 'white',
      zIndex: 10,
      left: -20,
      top: scaledSize,
      width: 40 + scaledSize,
      textAlign: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  });
  useEffect(() => {
    if (!highLighted) {
      return;
    }
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [animatedValue]);
  return (
    <Animated.View
      style={[
        style.container,
        {
          opacity: animatedValue,
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          console.log('Clicked', { x, y, title, id, data });
          onClick({ x, y, title, id, data });
        }}
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
    </Animated.View>
  );
};
