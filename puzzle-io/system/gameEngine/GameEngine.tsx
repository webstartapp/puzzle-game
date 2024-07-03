import React, { useState, useEffect, useRef, useCallback, FC, useMemo } from "react";
import { View, StyleSheet, Dimensions, Pressable, GestureResponderEvent, ViewStyle } from "react-native";
import DefaultTimer from "./DefaultTimer";
import DefaultRenderer, { EventItem, IEntity } from "./DefaultRenderer";
import DefaultTouchProcessor from "./DefaultTouchProcessor";

export type TouchEventType = 'start' | 'end' | 'move' | 'press' | 'long-press';

type GameEngineProps = {
  style: ViewStyle;
  renderer?: any;
  touchProcessor?: any;
  children?: any;
  system?: (entities: IEntity[], events: EventItem) => IEntity[];
  entities: Record<string, IEntity>;
  running?: boolean;
  timer?: any;
};

const GameEngine: FC<GameEngineProps> = ({style, children, entities, system}) => {
  // const [forceRenderId, setForceRenderId] = useState(math.random());

  return (
    <View
      style={[css.container]}
    >
      <DefaultRenderer
        entities={entities}
        contentSize={{width: 100, height: 100}}
        style={style}
        system={system}
      />

      <View
        pointerEvents={"box-none"}
        style={StyleSheet.absoluteFill}
      >
        {children}
      </View>
    </View>
  );
};

const css = StyleSheet.create({
  container: {
    flex: 1
  },
  entityContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
});

export default GameEngine;
