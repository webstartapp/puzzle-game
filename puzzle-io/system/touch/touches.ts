import { IEntityState } from '@/system/gameEngine/GameEngine';
import { EventItem } from '../gameEngine/DefaultRenderer';
import { getStoreValue, IStore, setStoreValue } from '@/hooks/store/useStore';

const addToCache = async (entity: IStore['moves'][number]) => {
  const previousEntities = await getStoreValue('moves', []);

  previousEntities.push(entity);
  console.log(previousEntities);
  setStoreValue('moves', previousEntities);
};

const MoveFinger = (entities: IEntityState[], event: EventItem) => {
  const mapToString = (map: { x: number; y: number }) => `${map.x}-${map.y}`;
  const ocupiedCells = entities.map((entity) => mapToString(entity.map));
  const newMap = {
    x: Math.floor(event.touch.moveX),
    y: Math.floor(event.touch.moveY),
  };
  const isOccupied =
    event.touch.moveX <= 0 ||
    event.touch.moveY <= 0 ||
    event.touch.moveX > 5 ||
    event.touch.moveY > 5 ||
    ocupiedCells.filter((cell) => cell === mapToString(newMap)).length > 0;
  const new_key = `${event.entity.key.split('x')[0]}x${Math.random()}`;

  const newEntites = entities.map((entity) => {
    if (entity.key === event.entity?.key) {
      if (event.type === 'start') {
        return {
          ...entity,
          eventStartPosition: {
            ...entity.position,
          },
          position: {
            ...entity.position,
            z: 99,
          },
        };
      }
      if (event.type === 'end') {
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
          key: isOccupied ? entity.key : new_key,
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
  if (!isOccupied && event.type === 'end') {
    console.log(37, newEntites, event.type);
    const move = {
      key: event.entity?.key,
      from: event.entity?.map,
      to: newMap,
      newKey: new_key,
    };
    addToCache(move);
  }
  return newEntites;
};

export { MoveFinger };
