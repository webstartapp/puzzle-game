import { Finger } from "@/components/items/Finger";
import GameEngine from "@/system/gameEngine/GameEngine";
import { MoveFinger } from "@/system/touch/touches";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
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
          z: 1
        
        },
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