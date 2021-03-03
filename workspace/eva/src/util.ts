import { Game, GameObject, resource, RESOURCE_TYPE } from "@eva/eva.js";
import { RendererSystem } from "@eva/plugin-renderer";
import { DragonBoneSystem } from "@eva/plugin-renderer-dragonbone";
import { ImgSystem } from "@eva/plugin-renderer-img";
import { TextSystem } from "@eva/plugin-renderer-text";
import { StatsSystem } from "@eva/plugin-stats";
import { TransitionSystem } from "@eva/plugin-transition";

export function createContainer() {
  return new GameObject("container", {
    position: {
      x: 0,
      y: 0,
    },
  })
}

/** 初始化 */
export function createGame() {
  const renderSystem = new RendererSystem({
    canvas: document.querySelector('#canvas'),
    width: 960,
    height: 640,
    resolution: window.devicePixelRatio,
    transparent: false,
    preventScroll: false,
    renderType: 0
  })

  const statsSystem = new StatsSystem({
    show: true,
    style: {
      x: 0,
      y: 0,
      width: 8,
      height: 6,
    }
  })

  const dragonBoneSystem = new DragonBoneSystem()
  const textSystem = new TextSystem()
  const imgSystem = new ImgSystem()
  const transitionSystem = new TransitionSystem()


  const game = new Game({
    autoStart: true,
    systems: [renderSystem, statsSystem, dragonBoneSystem, textSystem, imgSystem, transitionSystem]
  });

  return game;
}

const BASE_URL = process.env.mode === 'development' ? '' : 'https://2d-benchmark.oss-cn-hangzhou.aliyuncs.com'

/** 返回龙骨动画名称 */
/** 返回图片名称及宽高 */
export const addResource = (function () {
  let firstFlag = true

  const dbs: { name: any; anim: any; }[] = []
  const images: { name: any; w: number; h: number; }[] = []

  return async function () {
    if (!firstFlag) return { dbs, images };

    const { db, spirit } = await fetch(BASE_URL + "/assets/info.json").then(res => res.json())

    const res = []

    for (const key in db) {

      const info = _buildDBResourceInfo(key, db[key])

      res.push(info);

      dbs.push({ name: info.name, anim: db[key][0].action[0].name });

    }

    for (const key in spirit) {
      for (let i = 0; i < spirit[key].length; i++) {

        let { name: filename, w, h } = spirit[key][i];

        const info = _buildImageResourceInfo(key, filename, i)

        res.push(info);

        images.push({ name: info.name, w, h });
      }
    }

    resource.addResource(res);

    firstFlag = false;

    return { dbs, images };
  }
})()

function _buildImageResourceInfo(key: string, filename: string, idx: number) {
  return {
    name: key + idx,
    type: RESOURCE_TYPE.IMAGE,
    src: {
      image: {
        type: 'png',
        url:
          `${BASE_URL}/assets/spirit/${key}/${filename}`,
      },
    }
  }
}

/** 创建ResourceBase */
function _buildDBResourceInfo(name: string, files: AssetsInfo["db"]["name"]) {
  return {
    name,
    type: RESOURCE_TYPE.DRAGONBONE,
    src: {
      image: {
        type: 'png',
        url: `${BASE_URL}/assets/db/${name}/${files[2].name}`,
      },
      tex: {
        type: 'json',
        url: `${BASE_URL}/assets/db/${name}/${files[1]}`,
      },
      ske: {
        type: 'json',
        url: `${BASE_URL}/assets/db/${name}/${files[0].name}`,
      },
    },
    preload: true,
  }
}