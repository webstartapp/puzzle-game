import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Image } from 'expo-image';
import { IEntityState, Position } from '@/system/gameEngine/GameEngine';

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
  entity: IEntityState;
  world: Position;
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
      />
    </View>
  );
};

export { Finger };
