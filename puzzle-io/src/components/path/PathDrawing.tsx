import { Dimensions, Image, ImageSourcePropType, View } from 'react-native';
import { PathArrow } from './PathArrow';
import { PathSign } from './PathSign';
import { IGrid } from '@/_generated/sessionOperations';
import { FC, useMemo, useRef } from 'react';
import { Asset } from 'expo-asset';

export type PathCheckpoint = {
  x: number;
  y: number;
  label: string;
  onClick: () => void;
};

type PathDrawingProps = {
  paths: PathCheckpoint[];
  image: ImageSourcePropType;
};

const PathDrawing: FC<PathDrawingProps> = ({ paths, image }) => {
  const screen = useRef(Dimensions.get('window'));

  const size = useMemo(() => {
    const w = screen.current.width;
    const h = screen.current.height;
    const size = Math.min(w, h);
    return {
      size,
      shift: {
        x: (w - size) / 2,
        y: (h - size) / 2,
      },
    };
  }, [screen]);

  const pathsWithRotation = useMemo(() => {
    const out: {
      x: number;
      y: number;
      rotation: number;
      label: string;
      onClick: () => void;
      isSign?: boolean;
      scale: number;
    }[] = [];
    const itemSize = size.size / 20;

    (paths || []).forEach(({ x, y, label, onClick }, index) => {
      const next = paths[index + 1];
      const scale = itemSize / 50;

      out.push({
        x: x * itemSize,
        y: y * itemSize,
        rotation: 0,
        label,
        onClick,
        isSign: true,
        scale,
      });
      if (!next) {
        return;
      }
      const rotation = Math.atan2(next.y - y, next.x - x);

      const distance = Math.sqrt((next.y - y) ** 2 + (next.x - x) ** 2);
      const steps = distance / 1;
      const shiftedByX = (next.x - x) / steps;
      const shiftedByY = (next.y - y) / steps;
      for (let i = 1; i < steps - 1; i++) {
        const newX = (x + shiftedByX * i) * itemSize;
        const newY = (y + shiftedByY * i) * itemSize;
        out.push({
          x: newX,
          y: newY,
          rotation,
          label,
          scale,
          onClick: () => {},
        });
      }
    });

    return out;
  }, [paths, size]);

  return (
    <View
      style={{
        position: 'absolute',
        width: size.size,
        height: size.size,
        backgroundColor: 'rgba(0,0,0,0.5)',
        left: size.shift.x,
        top: size.shift.y,
      }}
    >
      <Image
        source={image}
        style={{
          width: size.size,
          height: size.size,
          position: 'absolute',
        }}
      />
      {pathsWithRotation.map(
        ({ x, y, rotation, label, onClick, isSign, scale }, index) => {
          if (isSign) {
            return (
              <PathSign
                key={index}
                x={x}
                y={y}
                label={label}
                onClick={onClick}
                scale={scale}
              />
            );
          }
          return (
            <PathArrow
              key={index}
              x={x}
              y={y}
              rotation={rotation}
              scale={scale}
            />
          );
        },
      )}
    </View>
  );
};

export default PathDrawing;
