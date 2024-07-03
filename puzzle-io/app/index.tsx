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
    image: ImageResolvedAssetSource;
  }
}


export default function Index() {
  const [image, setImage] = useState<ImageResolvedAssetSource>();
  useEffect(() => {
    loadImage('https://pspdfkit.com/assets/images/hero/guides/react-native-dac46f62.png')
      .then(setImage);
  }, []);
  if(!image) {
    return <Text>Loading...</Text>;
  }
  return (
    <GameEngine
      system={MoveFinger}
      style={{
        backgroundColor: "orange"
      }}
      entities={{
        1: { position: {
          x: 20,
          y: 20,
          width: 20,
          height: 20,
          z: 1,
        },
        image: image,
        component: <Finger />,
        styles: {
          backgroundColor: "blue"
        }
      }, //-- Notice that each entity has a unique id (required)
        2: { position: {
          x: 40,
          y: 40,
          width: 20,
          height: 20,
          z: 2
        },
        image: image,
        component: <Finger />,
        styles: {
          backgroundColor: "red"
        }
      },
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