/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  PanResponderGestureState,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { GameEngineSystem, TouchEventType } from './GameEngine';
import DraggableView from './draggableView';

export interface IEntity {
  component: FC<any>;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
    z: number;
  };
}

export interface IEntityState extends IEntity {
  eventStartPosition: {
    x: number;
    y: number;
    z: number;
    width: number;
    height: number;
  };
  key?: string;
}

export type EventItem = {
  type: TouchEventType;
  entity: IEntityState;
  touch: {
    x: number;
    y: number;
    moveX: number;
    moveY: number;
  };
  grid: {
    x: number;
    y: number;
    moveX: number;
    moveY: number;
  };
};

type EntityRendererProps = {
  entities: Record<string, IEntity>;
  contentSize: {
    width: number;
    height: number;
  };
  style: ViewStyle;
  system?: GameEngineSystem;
  gridSnaps: {
    x: number;
    y: number;
  };
};

declare global {
  var entyties: IEntityState[];
}

const EntityRenderer: FC<EntityRendererProps> = ({
  entities,
  contentSize,
  style,
  system,
  gridSnaps,
}) => {
  const screen = useRef(Dimensions.get('window'));
  const [entityList, setEntityList] = useState<IEntityState[]>([]);

  const ratio = useMemo(() => {
    const ratioOfScreen = screen.current.width / screen.current.height;
    const ratioOfGame = contentSize.width / contentSize.height;
    if (ratioOfScreen > ratioOfGame) {
      return screen.current.height / contentSize.height;
    } else {
      return screen.current.width / contentSize.width;
    }
  }, [contentSize, screen]);

  const shift = {
    x: (screen.current.width - contentSize.width * ratio) / 2,
    y: (screen.current.height - contentSize.height * ratio) / 2,
  };

  useEffect(() => {
    global.entyties = Object.keys(entities)
      .filter((key) => entities[key].component)
      .map((key) => {
        return {
          ...entities[key],
          key,
          world: {
            x: entities[key].position.x * ratio + shift.x,
            y: entities[key].position.y * ratio + shift.y,
            width: entities[key].position.width * ratio,
            height: entities[key].position.height * ratio,
          },
          eventStartPosition: {
            x: entities[key].position.x,
            y: entities[key].position.y,
            z: entities[key].position.z,
            width: entities[key].position.width,
            height: entities[key].position.height,
          },
        };
      });

    setEntityList(global.entyties);
  }, [entities, ratio, shift.x, shift.y]);

  const setEntities = useCallback<
    (
      type: TouchEventType,
      entity: IEntityState,
      gestureState: PanResponderGestureState,
    ) => void
  >(
    (type, entity, gestureState) => {
      if (!system) return;
      const gestureDX = {
        x: gestureState.dx / ratio,
        y: gestureState.dy / ratio,
      };
      const gridIndex = {
        x: Math.floor(
          (gestureState.moveX - shift.x) /
            ratio /
            (contentSize.width / gridSnaps.x),
        ),
        y: Math.floor(
          (gestureState.moveY - shift.y) /
            ratio /
            (contentSize.height / gridSnaps.y),
        ),
      };
      const newEntities = system(global.entyties, {
        type: type,
        entity: entity,
        touch: {
          x: entity.position.x + gestureDX.x,
          y: entity.position.y + gestureDX.y,
          moveX: (gestureState.moveX - shift.x) / ratio,
          moveY: (gestureState.moveY - shift.y) / ratio,
        },
        grid: {
          x: gridIndex.x,
          y: gridIndex.y,
          moveX: gridSnaps?.x
            ? Math.floor(
                (gestureState.moveX - shift.x) /
                  ratio /
                  (contentSize.width / gridSnaps.x),
              ) *
              (contentSize.width / gridSnaps.x)
            : 0,
          moveY: gridSnaps?.y
            ? Math.floor(
                (gestureState.moveY - shift.y) /
                  ratio /
                  (contentSize.height / gridSnaps.y),
              ) *
              (contentSize.height / gridSnaps.y)
            : 0,
        },
      });
      global.entyties = newEntities.map((entityData) => {
        if (entity.key !== entityData.key) {
          return entityData;
        }
        return {
          ...entityData,
          world: {
            x: entityData.position.x * ratio + shift.x,
            y: entityData.position.y * ratio + shift.y,
            width: entityData.position.width * ratio,
            height: entityData.position.height * ratio,
          },
        };
      });
      setEntityList([...global.entyties]);
    },
    [
      JSON.stringify(
        entityList.map(({ position }) => {
          return position;
        }),
      ),
      system,
      ratio,
    ],
  );

  return (
    <View
      id="gameenf"
      style={
        {
          width: screen.current.width,
          height: screen.current.height,
          userSelect: 'none',
        } as any
      }
    >
      <View
        style={{
          ...(style || {}),
          width: contentSize.width * ratio,
          height: contentSize.height * ratio,
          left: shift.x,
          top: shift.y,
        }}
      >
        {entityList
          .sort((a, b) => (a.position.z || 0) - (b.position.z || 0))
          .map((entity) => {
            const size = {
              width: entity.position.width * ratio,
              height: entity.position.height * ratio,
              left: entity.position.x * ratio,
              top: entity.position.y * ratio,
            };
            const styles = StyleSheet.create({
              [`item_${entity.key}`]: {
                position: 'absolute',
                ...size,
              },
            });

            return (
              <DraggableView
                key={entity.key}
                entity={entity}
                setEntities={setEntities}
                styles={styles[`item_${entity.key}`]}
              />
            );
          })}
      </View>
    </View>
  );
};

export default EntityRenderer;
