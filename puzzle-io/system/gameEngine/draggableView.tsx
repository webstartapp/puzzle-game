import { IEntity } from '@/system/gameEngine/DefaultRenderer';
import React, {cloneElement, FC, useRef} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text, GestureResponderEvent, PanResponderGestureState, ViewStyle} from 'react-native';

const App: FC<{
  entity: IEntity;
  setEntities:  (entity: IEntity, e: GestureResponderEvent, gestureState: PanResponderGestureState, pan: Animated.ValueXY, entyties: IEntity[]) => void;
  styles: ViewStyle;
  entities: IEntity[];
}> = ({entity, setEntities,styles, entities}) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        setEntities(entity, e, gestureState, pan, entities);
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
            {cloneElement(entity.component, entity)}
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