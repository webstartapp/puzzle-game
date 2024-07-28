import React, { FC, useRef } from 'react';
import {
  Animated,
  PanResponder,
  PanResponderGestureState,
  ViewStyle,
} from 'react-native';
import {
  IStateEntity,
  ISystemCustomData,
  PositionWorld,
  TouchEventType,
} from './GameEngine';

const App: FC<{
  entity: IStateEntity;
  world: PositionWorld;
  setEntities: (props: {
    type: TouchEventType;
    entity?: IStateEntity;
    gestureState?: PanResponderGestureState;
    customData?: ISystemCustomData;
  }) => void;
  styles: ViewStyle;
}> = ({ entity, setEntities, styles, world }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (e, gestureState) => {
        setEntities({ type: 'start', entity, gestureState });
        return true;
      },
      onPanResponderStart: (e, gestureState) => {
        setEntities({ type: 'start', entity, gestureState });
      },
      onPanResponderMove: (e, gestureState) => {
        setEntities({ type: 'move', entity, gestureState });
        return;
      },
      onPanResponderRelease: (e, gestureState) => {
        setEntities({ type: 'end', entity, gestureState });
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
