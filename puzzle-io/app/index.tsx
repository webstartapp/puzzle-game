import { Finger } from '@/components/items/Finger';
import { IEntity } from '@/system/gameEngine/GameEngine';
import GameEngine from '@/system/gameEngine/GameEngine';
import { MoveFinger } from '@/system/touch/touches';
import { StatusBar } from 'expo-status-bar';

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
  }
}

const entities: Record<string, IEntity> = {};
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
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
    };
  }
}

const randomizedMaps = Object.keys(entities).map((key) => entities[key].map);
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

export default function Index() {
  return (
    <GameEngine
      system={MoveFinger}
      style={{
        backgroundColor: 'orange',
      }}
      entities={entities}
      gridSnaps={{
        cell: {
          width: 20,
          height: 20,
        },
        padding: {
          x: 0,
          y: 0,
        },
      }}
      contentSize={{
        width: 100,
        height: 100,
      }}
    >
      <StatusBar hidden={true} />
    </GameEngine>
  );
}
