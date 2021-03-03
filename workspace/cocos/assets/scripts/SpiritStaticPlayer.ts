
import { _decorator, Component, Node, assetManager as R, JsonAsset, SpriteFrame, Sprite, Texture2D, ImageAsset } from 'cc';
import { BASE_URL } from './ChangeScene';
const { ccclass } = _decorator;

interface AssetsInfo {
    spirit: {
        [path in string]: {
            name: string,
            w: number,
            h: number
        }[]
    }
}

interface Params {
    textureCount: number,
    objectCount: number,
}

@ccclass('SpiritStaticPlayer')
export class Player extends Component {

    start() {
        let { textureCount, objectCount } = (window as any).myData as Params
        this.node.destroyAllChildren();

        if (textureCount < 1) return;

        R.loadRemote(`${BASE_URL}/info.json`, JsonAsset, (err, data: JsonAsset) => {
            const { spirit } = data.json as AssetsInfo;

            while (objectCount > 0) {
                let count = 0

                for (const key in spirit) {
                    count++;

                    for (let i = 0; i < spirit[key].length; i++) {
                        const filename = spirit[key][i].name;

                        R.loadRemote(`${BASE_URL}/spirit/${key}/${filename}`, ImageAsset, (err, data: ImageAsset) => {
                            const node = new Node(key);
                            const sprite = node.addComponent(Sprite);
                            const frame = new SpriteFrame();
                            frame.texture = data._texture;
                            sprite.spriteFrame = frame;
                            node.position.set((Math.random() - 0.5) * 960, (Math.random() - 0.5) * 640, 0);
                            this.node.addChild(node);
                        })

                        objectCount--;
                        if (objectCount === 0) break;
                    }
                    if (objectCount === 0) break;
                    if (count >= textureCount) break;
                }
            }
        })
    }
}