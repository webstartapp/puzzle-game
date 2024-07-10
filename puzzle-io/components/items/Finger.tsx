import { IEntity } from '@/system/gameEngine/DefaultRenderer';
import React, { FC, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageSourcePropType,
  ImageURISource,
} from 'react-native';
import { Asset, useAssets } from 'expo-asset';
import {
  manipulateAsync,
  FlipType,
  SaveFormat,
  ImageResult,
} from 'expo-image-manipulator';
import dogImage from '@/assets/puzzle_set/animals/Dog cat and mouse.jpeg';

import { Image } from 'expo-image';

const RADIUS = 20;

// const cropImage = async (
//   image: ImageSourcePropType,
//   grid: {
//     x: number;
//     y: number;
//     width: number;
//     height: number;
//   },
// ) => {
//   c;
//   const manipulated = await manipulateAsync(image, [{ crop: grid }], {
//     compress: 1,
//     format: SaveFormat.JPEG,
//   });
//   console.log(await image);
//   const image = await useAssets(
//     '/assets/puzzle_set/animals/Dog cat and mouse.jpeg',
//   );
//   const { x, y, width, height } = grid;
//   const { uri } = image as ImageURISource;
//   const cropData = {
//     offset: { x, y },
//     size: { width, height },
//   };
//   return { uri };
// };

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
  const [imageAsset, setImageAsset] = useState<ImageResult>();

  const [image] = useAssets(dogImage);

  useEffect(() => {
    const T = async () => {
      if (!image?.[0]?.uri) return;
      const manipualted = await manipulateAsync(image?.[0]?.uri, [
        {
          resize: {
            width: world.width * 5,
            height: world.height * 5,
          },
        },
        {
          crop: {
            originX: indexes?.x * world.width,
            originY: indexes?.y * world.height,
            width: world.width,
            height: world.height,
          },
        },
      ]);
      setImageAsset(manipualted);
    };
    T();
  }, [image]);
  console.log(73, image);

  // const ImageBody = cropImage(image, {
  //   x: indexes?.x * world.width,
  //   y: indexes?.y * world.height,
  //   width: world.width,
  //   height: world.height,
  // });

  return (
    <View style={[styles.finger]}>
      <Image
        source={imageAsset}
        style={{ width: world.width, height: world.height }}
      />
    </View>
  );
};

export { Finger };
