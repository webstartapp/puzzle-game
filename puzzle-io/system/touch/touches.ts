import { IEntity, EventItem } from "../gameEngine/DefaultRenderer";

const MoveFinger = (entities: IEntity[], event: EventItem) => {
  console.log(4, event, entities);
    return (
      entities.map(entity => {
      if(entity.key === event.entity?.key) {
        console.log(8, entity.key, event.entity?.key)
        if(event.type === 'end') {
          return {
            ...entity,
            position: {
              ...entity.position,
              x: event.touch.snapX,
              y: event.touch.snapY,
            },
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