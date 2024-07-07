import { IEntityState } from '@/system/gameEngine/DefaultRenderer';
import React, { FC, useRef } from 'react';
import {
  Animated,
  PanResponder,
  PanResponderGestureState,
  ViewStyle,
} from 'react-native';
import { TouchEventType } from './GameEngine';

const App: FC<{
  entity: IEntityState;
  setEntities: (
    type: TouchEventType,
    entity: IEntityState,
    gestureState: PanResponderGestureState,
  ) => void;
  styles: ViewStyle;
}> = ({ entity, setEntities, styles }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const { world } = entity as any;

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
