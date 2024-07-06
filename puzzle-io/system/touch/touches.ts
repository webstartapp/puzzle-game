import { IEntity, EventItem } from "../gameEngine/DefaultRenderer";

const MoveFinger = (entities: IEntity[], event: EventItem) => {
    const mapToString = (map: {x: number, y: number}) => `${map.x}-${map.y}`;
    const ocupiedCells = entities.map(entity => mapToString(entity.map));
    return (
      entities.map(entity => {
      if(entity.key === event.entity?.key) {
        const newMap = {
          x: Math.floor(event.touch.snapX / 20),
          y: Math.floor(event.touch.snapY / 20),
        }
        if(event.type === 'start') {
          return {
            ...entity,
            init: {
              ...entity.position,
              x: event.touch.snapX,
              y: event.touch.snapY,
            },
            position: {
              ...entity.position,
              z: 99,            }
          };
        }
        if(event.type === 'end') {
          const isOccupied = ocupiedCells.filter(cell => cell === mapToString(newMap)).length > 0;
          console.log(isOccupied, ocupiedCells, mapToString(newMap), {...entity.init});
          return {
            ...entity,
            position: {
              ...entity.position,
              z: 1,
              x: isOccupied ? entity.init.x : event.touch.snapX,
              y: isOccupied ? entity.init.y : event.touch.snapY,
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
    })
    );
  };
  
  export { MoveFinger };