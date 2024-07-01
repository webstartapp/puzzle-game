import React, { FC } from "react";
import { StyleSheet, View } from "react-native";

const RADIUS = 20;

type Props = {
  position?: [number, number];
};

const Finger: FC<Props> = () => {
  return (
    <View style={[styles.finger]} />
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