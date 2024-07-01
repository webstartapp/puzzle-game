import React, { useState, useEffect, useRef, useCallback, FC, useMemo } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import DefaultTimer from "./DefaultTimer";
import DefaultRenderer from "./DefaultRenderer";
import DefaultTouchProcessor from "./DefaultTouchProcessor";

export type TouchEventType = 'start' | 'end' | 'move' | 'press' | 'long-press';

type GameEngineProps = {
  style?: any;
  renderer?: any;
  touchProcessor?: any;
  children?: any;
  systems?: any[];
  entities?: any;
  running?: boolean;
  timer?: any;
};

const GameEngine: FC<GameEngineProps> = ({style, renderer, touchProcessor, children, entities, systems}) => {
  // const [forceRenderId, setForceRenderId] = useState(math.random());
  const layout = useRef(null);
  const screen = useRef(Dimensions.get("window"));
  const [state, setState] = useState({
    entities: [],
    time: 0,
    events: [],
  });

  // const systemsHandler = useMemo(()=>(systems || []).map((system) => system[1]

  const touches = useMemo(()=>{
    const out: string[] = [];
    for (let key in entities) {
      if (entities[key].touches) {
        out.push(...entities[key].touches);
      }
    }
    return out.filter((touch, index)=>out.indexOf(touch) === index);
  }, [entities]);

  return (
    <View
      style={[css.container, style]}
    >
      
      <View
        style={css.entityContainer}
      >
        {DefaultRenderer(entities, {width: 100, height: 100})}
      </View>

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
