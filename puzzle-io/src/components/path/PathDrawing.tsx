import { Dimensions, Image, ImageSourcePropType, View } from 'react-native';
import { PathArrow } from './PathArrow';
import { PathSign } from './PathSign';
import { IGrid } from '@/_generated/sessionOperations';
import { FC, useMemo, useRef } from 'react';
import { Asset } from 'expo-asset';

const gridSize = {
  x: 20,
  y: 20,
};

export type PathCheckpoint<T extends any> = {
  x: number;
  y: number;
  title: string;
  id: string;
  data: T;
};

type PathDrawingProps<T extends any> = {
  paths: PathCheckpoint<T>[];
  image: ImageSourcePropType;
  onClick: (checkpoint: Omit<PathCheckpoint<T>, 'onClick'>) => void;
  highLightedId?: string | number;
};

const PathDrawing = <T extends any = any>({
  paths,
  image,
  onClick,
  highLightedId,
}: PathDrawingProps<T>) => {
  const screen = useRef(Dimensions.get('window'));

  const size = useMemo(() => {
    const w = screen.current.width;
    const h = screen.current.height;
    const size = Math.min(w, h);
    return {
      size,
      ratio: {
        x: w / size,
        y: h / size,
      },
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
      title: string;
      isSign?: boolean;
      scale: number;
      id: string;
      data: T;
    }[] = [];
    const itemSize = {
      scale: Math.min((size.size / gridSize.x, size.size / gridSize.y)),
      x: (size.ratio.x * size.size) / gridSize.x,
      y: (size.ratio.y * size.size) / gridSize.y,
    };

    (paths || []).forEach(({ x, y, title, id, data }, index) => {
      const next = paths[index + 1];
      const scale = itemSize.scale / 50;

      out.push({
        x: x * itemSize.x,
        y: y * itemSize.y,
        rotation: 0,
        title,
        isSign: true,
        scale,
        id,
        data,
      });
      if (!next) {
        return;
      }

      const rotation = Math.atan2(
        (next.y - y) * size.ratio.y,
        (next.x - x) * size.ratio.x,
      );

      const distance = Math.sqrt((next.y - y) ** 2 + (next.x - x) ** 2);
      const steps = distance * 1.5;
      const shiftedByX = (next.x - x) / steps;
      const shiftedByY = (next.y - y) / steps;
      for (let i = 2; i < steps - 1; i++) {
        const newX = (x + shiftedByX * i) * itemSize.x;
        const newY = (y + shiftedByY * i) * itemSize.y;
        out.push({
          x: newX,
          y: newY,
          rotation,
          title,
          scale: scale,
          id,
          data,
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
        left: 0,
        top: 0,
      }}
    >
      {pathsWithRotation.map(
        ({ x, y, rotation, title, isSign, scale, id, data }, index) => {
          if (isSign) {
            return (
              <PathSign
                key={index}
                x={x}
                y={y}
                title={title}
                onClick={onClick}
                scale={scale}
                id={id}
                data={data}
                highLighted={id === highLightedId}
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
