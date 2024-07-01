import { EntityItem, EventItem } from "../gameEngine/DefaultRenderer";

const MoveFinger = (entities: EntityItem[], event: EventItem) => {
  console.log(4, event);
    return (
      entities.map(entity => {
      if(entity.key === event.id) {
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