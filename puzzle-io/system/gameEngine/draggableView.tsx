import { IEntity } from '@/system/gameEngine/DefaultRenderer';
import React, {cloneElement, FC, useRef} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text, GestureResponderEvent, PanResponderGestureState, ViewStyle} from 'react-native';

const App: FC<{
  entity: IEntity;
  setEntities:  (entity: IEntity, e: GestureResponderEvent, gestureState: PanResponderGestureState, pan: Animated.ValueXY) => void;
  styles: ViewStyle;
}> = ({entity, setEntities,styles}) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const { world } = entity as any; 

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        setEntities(entity, e, gestureState, pan);
      return;
      },
      onPanResponderRelease: () => {
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