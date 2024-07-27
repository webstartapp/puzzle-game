import React, { FC, useRef } from 'react';
import {
  Animated,
  PanResponder,
  PanResponderGestureState,
  ViewStyle,
} from 'react-native';
import { IEntityState, PositionWorld, TouchEventType } from './GameEngine';

const App: FC<{
  entity: IEntityState;
  world: PositionWorld;
  setEntities: (
    type: TouchEventType,
    entity: IEntityState,
    gestureState: PanResponderGestureState,
  ) => void;
  styles: ViewStyle;
}> = ({ entity, setEntities, styles, world }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (e, gestureState) => {
        setEntities('start', entity, gestureState);
        return true;
      },
      onPanResponderStart: (e, gestureState) => {
        setEntities('start', entity, gestureState);
      },
      onPanResponderMove: (e, gestureState) => {
        setEntities('move', entity, gestureState);
        return;
      },
      onPanResponderRelease: (e, gestureState) => {
        setEntities('end', entity, gestureState);
        pan.extractOffset();
      },
    }),
  ).current;

  return (
    <Animated.View
      style={{
        ...styles,
      }}
      {...panResponder.panHandlers}
    >
      <entity.component
        entity={entity}
        world={world}
      />
    </Animated.View>
  );
};

export default App;
