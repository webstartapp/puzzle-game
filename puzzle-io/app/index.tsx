import { Finger } from "@/components/items/Finger";
import { IEntity } from "@/system/gameEngine/DefaultRenderer";
import GameEngine from "@/system/gameEngine/GameEngine";
import { loadImage } from "@/system/imageLoader";
import { MoveFinger } from "@/system/touch/touches";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ImageResolvedAssetSource, StyleSheet, Text, View } from "react-native";

declare module "@/system/gameEngine/DefaultRenderer" {
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
        x: i * 20,
        y: j * 20,
        width: 20,
        height: 20,
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
      styles: {
        backgroundColor: "blue"
      }
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
      x: shufledMap[index].x * 20,
      y: shufledMap[index].y * 20,
    }
  };
});

delete entities["0-0"];





export default function Index() {

  return (
    <GameEngine
      system={MoveFinger}
      style={{
        backgroundColor: "orange"
      }}
      entities={entities}
      gridSnaps= {{
        x: 5,
        y: 5
      }}
      contentSize={{
        width: 100,
        height: 100
      }}
    >

      <StatusBar hidden={true} />

    </GameEngine>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFEEE"
  }
});