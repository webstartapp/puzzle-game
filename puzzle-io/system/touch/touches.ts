import { EventItem, IEntityState } from '../gameEngine/DefaultRenderer';

const MoveFinger = (entities: IEntityState[], event: EventItem) => {
  const mapToString = (map: { x: number; y: number }) => `${map.x}-${map.y}`;
  const ocupiedCells = entities.map((entity) => mapToString(entity.map));
  return entities.map((entity) => {
    if (entity.key === event.entity?.key) {
      const newMap = {
        x: event.grid.x,
        y: event.grid.y,
      };
      if (event.type === 'start') {
        return {
          ...entity,
          eventStartPosition: {
            ...entity.position,
            x: event.grid.moveX,
            y: event.grid.moveY,
          },
          position: {
            ...entity.position,
            z: 99,
          },
        };
      }
      if (event.type === 'end') {
        const isOccupied =
          ocupiedCells.filter((cell) => cell === mapToString(newMap)).length >
          0;
        return {
          ...entity,
          position: {
            ...entity.position,
            z: 1,
            x: isOccupied ? entity.eventStartPosition.x : event.grid.moveX,
            y: isOccupied ? entity.eventStartPosition.y : event.grid.moveY,
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
