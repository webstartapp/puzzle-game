import { Finger } from '@/components/items/Finger';
import { Grid } from '@/config/grid/indexedGrid';
import { LevelId, levels } from '@/config/levels';
import { IEntity } from '@/system/gameEngine/GameEngine';

const loadImage = (img: HTMLImageElement) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
  });

export const initiateGameLevel = async (
  levelId: LevelId,
): Promise<Record<string, IEntity>> => {
  const level = levels[levelId];
  const entities: Record<string, IEntity> = {};

  try {
    const img = new Image();
    img.src = `${level.image}`;

    await loadImage(img);
    const width = img.width;
    const height = img.height;

    const pixelSize = {
      width: width / level.grid.x,
      height: height / level.grid.y,
    };

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = pixelSize.width;
    canvas.height = pixelSize.height;

    if (!ctx) return {};
    for (let i = 0; i < level.grid.x; i++) {
      for (let j = 0; j < level.grid.y; j++) {
        ctx.drawImage(
          img,
          i * pixelSize.width,
          j * pixelSize.height,
          pixelSize.width,
          pixelSize.height,
          0,
          0,
          pixelSize.width,
          pixelSize.height,
        );
        const croppedBase64 = canvas.toDataURL('image/jpeg');
        entities[`${i}-${j}`] = {
          position: {
            x: i,
            y: j,
            width: 1,
            height: 1,
            z: 1,
          },
          indexes: {
            x: i,
            y: j,
          },
          map: {
            x: i,
            y: j,
          },
          component: Finger,
          image: {
            uri: croppedBase64,
            height: pixelSize.height,
            width: pixelSize.width,
          },
        } as IEntity;
      }
    }
    let emptyCell: Grid = {
      x: 0,
      y: 0,
    };
    level.shifts.forEach((shift) => {
      const id = `${shift.x}-${shift.y}`;
      const entity = entities[id];
      if (entity) {
        entity.position.x = emptyCell.x;
        entity.position.y = emptyCell.y;
        entity.map.x = emptyCell.x;
        entity.map.y = emptyCell.y;
        entities[id] = entity;
        emptyCell = {
          x: shift.x,
          y: shift.y,
        };
      }
    });
    delete entities['0-0'];
    return entities;
  } catch (error) {
    console.error(error);
    return {};
  }
};
