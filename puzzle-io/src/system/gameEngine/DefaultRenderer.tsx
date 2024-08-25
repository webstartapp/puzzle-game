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
  HeaderComponent,
  IEntity,
  IGameHeaderProps,
  IStateEntity,
  ISystemCustomData,
  PositionWorld,
  TouchEventType,
} from './GameEngine';
import DraggableView from './draggableView';

export type EventItem = {
  type: TouchEventType;
  entity?: IStateEntity;
  touch?: {
    x: number;
    y: number;
    moveX: number;
    moveY: number;
  };
  customData?: ISystemCustomData;
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
  header?: {
    height: number;
    component: HeaderComponent;
    props?: IGameHeaderProps;
  };
};

declare global {
  var entyties: IStateEntity[];
}

const EntityRenderer: FC<EntityRendererProps> = ({
  entities,
  contentSize,
  style,
  system,
  gridSnaps,
  header,
}) => {
  const screen = useRef(Dimensions.get('window'));
  const [entityList, setEntityList] = useState<IStateEntity[]>([]);

  const ratio = useMemo(() => {
    const screenHeight = screen.current.height - (header?.height || 0);
    const ratioOfScreen = screen.current.width / screenHeight;
    const ratioOfGame = contentSize.width / contentSize.height;
    if (ratioOfScreen > ratioOfGame) {
      return screenHeight / contentSize.height;
    } else {
      return screen.current.width / contentSize.width;
    }
  }, [contentSize, screen, header?.height]);

  const convertedGridSnaps: Required<GridInit<true>> = {
    cell: {
      width: gridSnaps.cell.width * ratio,
      height: gridSnaps.cell.height * ratio,
    },
    padding: {
      x: gridSnaps.padding.x * ratio * gridSnaps.cell.width,
      y: gridSnaps.padding.y * ratio * gridSnaps.cell.height,
    },
  };

  const shift = {
    x: (screen.current.width - contentSize.width * ratio) / 2,
    y:
      ((header?.height || 0) +
        screen.current.height -
        contentSize.height * ratio) /
      2,
  };

  useEffect(() => {
    global.entyties = Object.keys(entities || {})
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
        return newEntity as IStateEntity;
      });

    setEntityList(global.entyties);
  }, [entities, ratio, shift.x, shift.y]);

  const setEntities = useCallback<
    (props: {
      type: TouchEventType;
      entity?: IStateEntity;
      gestureState?: PanResponderGestureState;
      customData?: ISystemCustomData;
    }) => Promise<void>
  >(
    async ({ type, entity, gestureState, customData }) => {
      if (!system) return;
      const gestureDX = {
        x: (gestureState?.dx || 0) / convertedGridSnaps.cell.width,
        y: (gestureState?.dy || 0) / convertedGridSnaps.cell.height,
      };
      const touch = {
        x: (entity?.position?.x || 0) + gestureDX.x,
        y: (entity?.position?.y || 0) + gestureDX.y,
        moveX:
          ((gestureState?.moveX || 0) - shift.x) /
          convertedGridSnaps.cell.width,
        moveY:
          ((gestureState?.moveY || 0) - shift.y) /
          convertedGridSnaps.cell.height,
      };
      touch.moveX = touch.moveX - gridSnaps.padding.x;
      touch.moveY = touch.moveY - gridSnaps.padding.y;
      const newEntities = await system(global.entyties, {
        type,
        entity,
        touch,
        customData,
      });
      if (!newEntities) return;
      global.entyties = newEntities.map((entityData) => {
        if (entity?.key !== entityData.key) {
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
      {header?.height && header?.component ? (
        <View
          style={{
            position: 'absolute',
            width: screen.current.width,
            height: header.height,
            top: shift.y - header.height,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <header.component
            entities={entityList}
            dispatchSystem={(actionData) =>
              setEntities({ type: 'custom', customData: actionData })
            }
            {...(header?.props || ({} as IGameHeaderProps))}
          />
        </View>
      ) : null}
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
            const world: PositionWorld = {
              width: entity.position.width * convertedGridSnaps.cell.width,
              height: entity.position.height * convertedGridSnaps.cell.height,
              left:
                entity.position.x * convertedGridSnaps.cell.width +
                convertedGridSnaps.padding.x,
              top:
                entity.position.y * convertedGridSnaps.cell.height +
                convertedGridSnaps.padding.y,
            };
            const styles = StyleSheet.create({
              [`item_${entity.key}`]: {
                position: 'absolute',
                ...world,
              },
            });

            return (
              <DraggableView
                key={entity.key}
                entity={entity}
                setEntities={setEntities}
                styles={styles[`item_${entity.key}`]}
                world={world}
              />
            );
          })}
      </View>
    </View>
  );
};

export default EntityRenderer;
