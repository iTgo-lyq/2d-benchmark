import { Game, GameObject, resource, RESOURCE_TYPE } from '@eva/eva.js'
import { RendererSystem } from '@eva/plugin-renderer';
import { Img, ImgSystem } from '@eva/plugin-renderer-img';
import { StatsSystem } from '@eva/plugin-stats'
import { addResource, createContainer } from './util';

const params = {
  textureCount: 1,
  objectCount: 1,
}


export default async ({ textureCount, objectCount } = params) => {
  const container = createContainer();

  if (!textureCount) return container;

  const { images } = await addResource();

  while (objectCount > 0) {
    for (let j = 0; j < images.length && j < textureCount && objectCount > 0; j++) {
      const { name, w, h } = images[j]
      const spirit = new GameObject(name, {
        size: {
          width: w,
          height: h
        },
        position: {
          x: Math.random() * 920,
          y: Math.random() * 600,
        },
      });
      spirit.addComponent(new Img({ resource: name }))

      container.addChild(spirit);

      objectCount--;
    }
  }

  return container;
}