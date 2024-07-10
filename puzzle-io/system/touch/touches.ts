import { IEntityState } from '@/system/gameEngine/GameEngine';
import { EventItem } from '../gameEngine/DefaultRenderer';

const MoveFinger = (entities: IEntityState[], event: EventItem) => {
  const mapToString = (map: { x: number; y: number }) => `${map.x}-${map.y}`;
  const ocupiedCells = entities.map((entity) => mapToString(entity.map));
  return entities.map((entity) => {
    if (entity.key === event.entity?.key) {
      const newMap = {
        x: Math.floor(event.touch.moveX),
        y: Math.floor(event.touch.moveY),
      };
      if (event.type === 'start') {
        return {
          ...entity,
          eventStartPosition: {
            ...entity.position,
            x: Math.floor(event.touch.x),
            y: Math.floor(event.touch.y),
          },
          position: {
            ...entity.position,
            z: 99,
          },
        };
      }
      if (event.type === 'end') {
        console.log(27, event);
        const isOccupied =
          event.touch.moveX < 0 ||
          event.touch.moveY < 0 ||
          event.touch.moveX > 4 ||
          event.touch.moveY > 4 ||
          ocupiedCells.filter((cell) => cell === mapToString(newMap)).length >
            0;
        return {
          ...entity,
          position: {
            ...entity.position,
            z: 1,
            x: isOccupied
              ? entity.eventStartPosition.x
              : Math.floor(event.touch.moveX),
            y: isOccupied
              ? entity.eventStartPosition.y
              : Math.floor(event.touch.moveY),
          },
          map: isOccupied ? entity.map : newMap,
          key: Math.random().toString(36).substring(7),
        };
      }
      return {
        ...entity,
        position: {
          ...entity.position,
          x: event.touch.x,
          y: event.touch.y,
        },
      };
    }
    return entity;
  });
};

export { MoveFinger };
