import { Game, GameObject } from '@eva/eva.js'
import { RendererSystem } from '@eva/plugin-renderer';
import { DragonBone, DragonBoneSystem } from '@eva/plugin-renderer-dragonbone'
import { StatsSystem } from '@eva/plugin-stats'
import { addResource, createContainer } from './util';

const params = {
  dbCount: 1,
  objectCount: 1,
}

export default (async ({ dbCount, objectCount } = params) => {

  const container = createContainer();

  if (!dbCount) return container;

  const { dbs } = await addResource();

  while (objectCount > 0) {
    for (let i = 0; i < dbs.length && i < dbCount && objectCount > 0; i++) {
      const { name, anim } = dbs[i]
      const spirit = new GameObject(name, {
        position: {
          x: Math.random() * 920,
          y: Math.random() * 600,
        },
        anchor: {
          x: 0.5,
          y: 0.5,
        },
      });
      spirit.addComponent(new DragonBone({ resource: name, armatureName: anim }))

      container.addChild(spirit);

      objectCount--;
    }
  }

  return container;
})


