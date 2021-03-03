import { GameObject } from '@eva/eva.js'
import { handleChangeData } from './src/messageReceiver'
import useTextExample from './src/textExample'
import useSpiritStaticExample from './src/spiritStaticExample'
import useSpiritAnimExample from './src/spiritAnimExample'
import useDragonboneExample from './src/dragonboneExample'

import './example.css'
import { createGame } from './src/util'

const gameInstance = createGame();

let container: GameObject;

handleChangeData(async state => {
  const { example } = state

  if (container) gameInstance.scene.removeChild(container)

  switch (example) {
    case 'spirit-static':
      container = await useSpiritStaticExample(state);
      break;
    case 'spirit-anim':
      container = await useSpiritAnimExample(state);
      break;
    case 'text':
      container = await useTextExample(state);
      break;
    case 'dragonbone':
      container = await useDragonboneExample(state);
      break;
  }

  gameInstance.scene.addChild(container);
})
