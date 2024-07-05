import { IEntity } from '@/system/gameEngine/DefaultRenderer';
import React, {cloneElement, FC, useRef} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text, GestureResponderEvent, PanResponderGestureState, ViewStyle} from 'react-native';
import { TouchEventType } from './GameEngine';

const App: FC<{
  entity: IEntity;
  setEntities:  (type: TouchEventType, entity: IEntity, gestureState: PanResponderGestureState) => void;
  styles: ViewStyle;
}> = ({entity, setEntities,styles}) => {
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
        {...panResponder.panHandlers}>
            <entity.component  entity={entity} world={world} />
      </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
    position: 'absolute',
  },
});

export default App;