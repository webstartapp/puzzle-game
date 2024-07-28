import React, { FC, useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import DefaultRenderer, { EventItem } from './DefaultRenderer';

export type TouchEventType =
  | 'custom'
  | 'start'
  | 'end'
  | 'move'
  | 'press'
  | 'long-press';

export type GridInit<REQIRED extends boolean = false> = {
  cell?: REQIRED extends true
    ? {
        width: number;
        height: number;
      }
    : {
        width?: number;
        height?: number;
      };
  padding?: REQIRED extends true
    ? {
        x: number;
        y: number;
      }
    : {
        x?: number;
        y?: number;
      };
};

export type Position = {
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
};

export type PositionWorld = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type GridState = Required<GridInit<true>> & {
  x: number;
  y: number;
  startX: number;
  startY: number;
};

export interface IEntity {
  component: FC<{
    entity: IStateEntity;
    world: PositionWorld;
  }>;
  position: Position;
}

export interface ISystemCustomData {}

export interface IStateEntity extends IEntity {
  eventStartPosition: Position;
  key: string;
}

export type GameEngineSystem = (
  entities: IStateEntity[],
  events: EventItem,
) => Promise<IStateEntity[] | undefined>;

export type HeaderComponent = FC<{
  entities: IStateEntity[];
  dispatchSystem: (customData: ISystemCustomData) => void;
}>;

type GameEngineProps = {
  style: ViewStyle;
  children?: any;
  system?: GameEngineSystem;
  entities: Record<string, IEntity>;
  header: {
    height: number;
    component: HeaderComponent;
  };
  running?: boolean;
  contentSize: {
    width: number;
    height: number;
  };
  gridSnaps?: GridInit;
};

const GameEngine: FC<GameEngineProps> = ({
  style,
  children,
  entities,
  system,
  contentSize,
  gridSnaps,
  header,
}) => {
  // const [forceRenderId, setForceRenderId] = useState(math.random());

  const gridSnapsDefault = useMemo(() => {
    return {
      cell: {
        width: gridSnaps?.cell?.width || 1,
        height: gridSnaps?.cell?.height || 1,
      },
      padding: {
        x: gridSnaps?.padding?.x || 0,
        y: gridSnaps?.padding?.y || 0,
      },
    };
  }, [gridSnaps]);

  return (
    <View style={[css.container]}>
      <DefaultRenderer
        entities={entities}
        contentSize={contentSize || { width: 100, height: 100 }}
        header={header}
        style={style}
        system={system}
        gridSnaps={gridSnapsDefault}
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
