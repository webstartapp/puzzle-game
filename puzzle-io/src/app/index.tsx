import { Finger } from '@/components/items/Finger';
import { IEntity } from '@/src/system/gameEngine/GameEngine';
import GameEngine from '@/src/system/gameEngine/GameEngine';
import { MoveFinger } from '@/src/system/touch/touches';
import { ImageResult, manipulateAsync } from 'expo-image-manipulator';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import dogImage from '@/assets/puzzle_set/animals/Dog cat and mouse.jpeg';
import { useAssets } from 'expo-asset';
import { setStoreValue } from '@/hooks/store/useStore';
import GameStatusBar from '@/components/header/GameStatusBar';

declare module '@/system/gameEngine/GameEngine' {
  export interface IEntity {
    indexes: {
      x: number;
      y: number;
    };
    map: {
      x: number;
      y: number;
    };
    image: ImageResult;
  }
}

declare module '@/hooks/store/useStore' {
  export interface IStore {
    moves: {
      from: {
        x: number;
        y: number;
      };
      to: {
        x: number;
        y: number;
      };
      key: string;
      newKey: string;
    }[];
  }
}

export default function Index() {
  const [localEntyties, setLocalEntyties] = useState<Record<string, IEntity>>(
    {},
  );
  const [image] = useAssets(dogImage);

  useEffect(() => {
    if (!image?.[0]?.uri) return;
    console.log(30, image);
    const T = async () => {
      const entities: Record<string, IEntity> = {};
      await setStoreValue('moves', []);
      const pixelSize = {
        width: (image[0].width || 0) / 5,
        height: (image[0].height || 0) / 5,
      };
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          const manipualtedImage = await manipulateAsync(image?.[0]?.uri, [
            {
              crop: {
                originX: i * pixelSize.width,
                originY: j * pixelSize.height,
                width: pixelSize.width,
                height: pixelSize.height,
              },
            },
          ]);
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
            image: manipualtedImage,
          };
        }
      }
      const randomizedMaps = Object.keys(entities).map(
        (key) => entities[key].map,
      );
      // shuffle randomizedMaps
      const shufledMap = randomizedMaps.sort(() => Math.random() - 0.5);
      // shufle entities to random positions with only one occured on cell
      Object.keys(entities).forEach((key, index) => {
        entities[key] = {
          ...entities[key],
          map: {
            x: shufledMap[index].x,
            y: shufledMap[index].y,
          },
          position: {
            ...entities[key].position,
            x: shufledMap[index].x,
            y: shufledMap[index].y,
          },
        };
      });
      delete entities['0-0'];

      setLocalEntyties(entities);
    };
    T();
  }, [image]);

  return (
    <GameEngine
      system={MoveFinger}
      style={{
        backgroundColor: 'orange',
      }}
      entities={localEntyties}
      header={<GameStatusBar />}
      gridSnaps={{
        cell: {
          width: 20,
          height: 20,
        },
        padding: {
          x: 0,
          y: 1,
        },
      }}
      contentSize={{
        width: 100,
        height: 120,
      }}
    >
      <StatusBar hidden={true} />
    </GameEngine>
  );
}
