import { IEntity } from "@/system/gameEngine/DefaultRenderer";
import React, { FC } from "react";
import { Image, StyleSheet, View } from "react-native";

const RADIUS = 20;

type Props = {
  custom: any;
};

const Finger: FC<Partial<IEntity>> = ({image}) => {
  console.log(5, image);
  return (
    <View style={[styles.finger]}>
        <Image
          source={image}
          style={{
            width: RADIUS * 2,
            height: RADIUS * 2,
          }}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  finger: {
    borderColor: "#CCC",
    borderWidth: 4,
    borderRadius: RADIUS * 2,
    width: RADIUS * 2,
    height: RADIUS * 2,
    backgroundColor: "pink",
    position: "absolute"
  }
});

export { Finger };