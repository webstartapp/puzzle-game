import { Finger } from '@/components/items/Finger';
import { Grid } from '@/config/grid/indexedGrid';
import { LevelId, levels } from '@/config/levels';
import { IEntity } from '@/system/gameEngine/GameEngine';
import { Platform } from 'react-native';
import { Image as NativeImage } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';

type LoadImageType = {
  uri: string;
  width: number;
  height: number;
};

// Load image for web platform
const loadImageWeb = (img: HTMLImageElement): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
  });

// Load image for Expo platform
const loadImageExpo = async (uri: string): Promise<LoadImageType> =>
  new Promise((resolve) => {
    const asset = NativeImage.getSize(uri, (width, height) => {
      resolve({ width, height, uri });
    });
  });

// Crop image using ImageManipulator
const cropImage = async (
  uri: string,
  { left = 0, top = 0, width = 100, height = 100 },
) => {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ crop: { originX: left, originY: top, width: width, height: height } }],
    { format: ImageManipulator.SaveFormat.PNG },
  );
  return result.uri;
};

// Load image based on platform
export const loadImage = async (
  src: string,
): Promise<
  { uri: string; width: number; height: number } | HTMLImageElement
> => {
  if (Platform.OS === 'web') {
    const img = new Image();
    img.src = src;
    return loadImageWeb(img);
  } else {
    return loadImageExpo(src);
  }
};

// Initiate game level
export const initiateGameLevel = async (
  levelId: LevelId,
): Promise<Record<string, IEntity>> => {
  const level = levels[levelId];
  const entities: Record<string, IEntity> = {};

  console.log(65, level);

  try {
    const img = await loadImage(`${level.image}`);
    const width = img.width;
    const height = img.height;

    const pixelSize = {
      width: width / level.grid.x,
      height: height / level.grid.y,
    };

    // Generate entities for each grid cell
    for (let i = 0; i < level.grid.x; i++) {
      for (let j = 0; j < level.grid.y; j++) {
        const imageUri: LoadImageType = {
          uri: '',
          width: pixelSize.width,
          height: pixelSize.height,
        };

        if (Platform.OS === 'web') {
          // Crop image on web platform
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = pixelSize.width;
          canvas.height = pixelSize.height;

          if (ctx) {
            ctx.drawImage(
              img as HTMLImageElement,
              i * pixelSize.width,
              j * pixelSize.height,
              pixelSize.width,
              pixelSize.height,
              0,
              0,
              pixelSize.width,
              pixelSize.height,
            );
            const croppedBase64 = canvas.toDataURL('image/jpeg');
            imageUri.uri = croppedBase64;
          }
        } else {
          // Crop image on Expo platform
          const croppedBase64 = await cropImage(level.image, {
            left: i * pixelSize.width,
            top: j * pixelSize.height,
            width: pixelSize.width,
            height: pixelSize.height,
          });
          imageUri.uri = croppedBase64;
        }

        entities[`${i}-${j}`] = {
          position: {
            x: i,
            y: j,
            width: 1,
            height: 1,
            z: 1,
          },
          indexes: {
            x: i,
            y: j,
          },
          map: {
            x: i,
            y: j,
          },
          component: Finger,
          image: imageUri,
        } as IEntity;
      }
    }

    let emptyCell: Grid = {
      x: 0,
      y: 0,
    };

    // Apply shifts to entities
    level.shifts.forEach((shift) => {
      const id = `${shift.x}-${shift.y}`;
      const entity = entities[id];
      if (entity) {
        entity.position.x = emptyCell.x;
        entity.position.y = emptyCell.y;
        entity.map.x = emptyCell.x;
        entity.map.y = emptyCell.y;
        entities[id] = entity;
        emptyCell = {
          x: shift.x,
          y: shift.y,
        };
      }
    });

    // Remove initial empty cell
    delete entities['0-0'];

    return entities;
  } catch (error) {
    console.error(error);
    return {};
  }
};
