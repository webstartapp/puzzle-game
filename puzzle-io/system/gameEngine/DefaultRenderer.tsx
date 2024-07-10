/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  PanResponderGestureState,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {
  GameEngineSystem,
  GridInit,
  IEntity,
  IEntityState,
  TouchEventType,
} from './GameEngine';
import DraggableView from './draggableView';

export type EventItem = {
  type: TouchEventType;
  entity: IEntityState;
  touch: {
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
  gridSnaps: Required<GridInit<true>>;
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

  const convertedGridSnaps: Required<GridInit<true>> = {
    cell: {
      width: gridSnaps.cell.width * ratio,
      height: gridSnaps.cell.height * ratio,
    },
    padding: {
      x: gridSnaps.padding.x * ratio,
      y: gridSnaps.padding.y * ratio,
    },
  };

  const shift = {
    x:
      (screen.current.width - contentSize.width * ratio) / 2 +
      convertedGridSnaps.padding.x,
    y:
      (screen.current.height - contentSize.height * ratio) / 2 +
      convertedGridSnaps.padding.y,
  };

  useEffect(() => {
    global.entyties = Object.keys(entities)
      .filter((key) => entities[key].component)
      .map((key) => {
        const previousEntity = global.entyties?.find(
          (gEntity) => gEntity.key === key,
        );
        const newEntity = {
          ...entities[key],
          ...(previousEntity || {}),
          key,
        };
        return newEntity as IEntityState;
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
        x: gestureState.dx / ratio / gridSnaps.cell.width,
        y: gestureState.dy / ratio / gridSnaps.cell.height,
      };
      const newEntities = system(global.entyties, {
        type: type,
        entity: entity,
        touch: {
          x: entity.position.x + gestureDX.x,
          y: entity.position.y + gestureDX.y,
          moveX: (gestureState.moveX - shift.x) / ratio / gridSnaps.cell.width,
          moveY: (gestureState.moveY - shift.y) / ratio / gridSnaps.cell.height,
        },
      });
      global.entyties = newEntities.map((entityData) => {
        if (entity.key !== entityData.key) {
          return entityData;
        }
        return {
          ...entityData,
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
              width: entity.position.width * ratio * gridSnaps.cell.width,
              height: entity.position.height * ratio * gridSnaps.cell.height,
              left: entity.position.x * ratio * gridSnaps.cell.width,
              top: entity.position.y * ratio * gridSnaps.cell.height,
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
                world={{
                  x:
                    entity.position.x * ratio * gridSnaps.cell.width +
                    shift.x +
                    gridSnaps.padding.x,
                  y:
                    entity.position.y * ratio * gridSnaps.cell.height +
                    shift.y +
                    gridSnaps.padding.y,
                  z: entity.position.z || 0,
                  width: entity.position.width * ratio * gridSnaps.cell.width,
                  height:
                    entity.position.height * ratio * gridSnaps.cell.height,
                }}
              />
            );
          })}
      </View>
    </View>
  );
};

export default EntityRenderer;
