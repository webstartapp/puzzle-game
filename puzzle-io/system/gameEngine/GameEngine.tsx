import React, { FC } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import DefaultRenderer, { EventItem, IEntity } from './DefaultRenderer';
import { IEntityState } from '@/system/gameEngine/DefaultRenderer';

export type TouchEventType = 'start' | 'end' | 'move' | 'press' | 'long-press';

export type GameEngineSystem = (
  entities: IEntityState[],
  events: EventItem,
) => IEntityState[];

type GameEngineProps = {
  style: ViewStyle;
  renderer?: any;
  touchProcessor?: any;
  children?: any;
  system?: GameEngineSystem;
  entities: Record<string, IEntity>;
  running?: boolean;
  contentSize: {
    width: number;
    height: number;
  };
  gridSnaps?: {
    x: number;
    y: number;
  };
  timer?: any;
};

const GameEngine: FC<GameEngineProps> = ({
  style,
  children,
  entities,
  system,
  contentSize,
  gridSnaps,
}) => {
  // const [forceRenderId, setForceRenderId] = useState(math.random());

  return (
    <View style={[css.container]}>
      <DefaultRenderer
        entities={entities}
        contentSize={contentSize || { width: 100, height: 100 }}
        style={style}
        system={system}
        gridSnaps={
          gridSnaps || {
            x: contentSize.width,
            y: contentSize.height,
          } || {
            x: 100,
            y: 100,
          }
        }
      />

      <View
        pointerEvents={'box-none'}
        style={StyleSheet.absoluteFill}
      >
        {children}
      </View>
    </View>
  );
};

const css = StyleSheet.create({
  container: {
    flex: 1,
  },
  entityContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default GameEngine;
