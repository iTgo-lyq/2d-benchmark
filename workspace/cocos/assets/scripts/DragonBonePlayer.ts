import {
    _decorator,
    Component,
    dragonBones,
    assetManager as R,
    JsonAsset,
    Node,
    Texture2D,
} from "cc";
import { BASE_URL } from "./ChangeScene";
const { ccclass } = _decorator;

interface AssetsInfo {
    db: {
        [dir in string]: [
            {
                name: string;
                action: [
                    { name: string; anim: string[] },
                    { name: string; anim: string[] }
                ]
            },
            string,
            { name: string; w: number; h: number }
        ]
    }
}

interface Params {
    dbCount: number;
    objectCount: number;
}

@ccclass("DragonBonePlayer")
export class DragonBonePlayer extends Component {

    db?: AssetsInfo["db"];
    res: { atlas: dragonBones.DragonBonesAtlasAsset, dragonBone: dragonBones.DragonBonesAsset, name: string }[] = []

    start() {
        let { dbCount, objectCount } = (window as any).myData as Params;

        if (dbCount === 0) return;

        this.node.removeAllChildren();

        this.myLoad(() => {
            while (objectCount > 0) {
                let tempCount = 0;
                for (const { atlas, dragonBone, name } of this.res) {
                    if (tempCount >= dbCount) break;
                    if (objectCount === 0) break;
                    const node = new Node;
                    const dragonDisplay = node.addComponent(dragonBones.ArmatureDisplay);
                    node.position.set((Math.random() - 0.5) * 960, (Math.random() - 0.5) * 640, 0);
                    dragonDisplay.dragonAtlasAsset = atlas;
                    dragonDisplay.dragonAsset = dragonBone;
                    if (this.db) {
                        dragonDisplay.armatureName = this.db[name][0].action[0].name;
                        dragonDisplay.playAnimation(this.db[name][0].action[0].anim[0], 0);
                    }
                    this.node.addChild(node);
                    tempCount++;
                    objectCount--;
                }
            }
        })

    }

    myLoad(fn: () => void) {
        let count = 0

        R.loadRemote(BASE_URL + "/info.json", JsonAsset, (err, data: JsonAsset) => {

            const { db } = (data.json as any) as AssetsInfo;

            this.db = db;

            for (const dir in db) {
                if ("Taobao" === dir) continue;

                count++;

                const ske = `${BASE_URL}/db/${dir}/${db[dir][0].name}`
                const atlas = `${BASE_URL}/db/${dir}/${db[dir][1]}`
                const image = `${BASE_URL}/db/${dir}/${db[dir][2].name}`

                R.loadRemote(image, Texture2D, (err, texture: Texture2D) => {
                    R.loadRemote(atlas, JsonAsset, (err, atlasJson: JsonAsset) => {
                        R.loadRemote(ske, JsonAsset, (err, dragonBonesJson: JsonAsset) => {

                            const atlas = new dragonBones.DragonBonesAtlasAsset();
                            atlas.atlasJson = JSON.stringify(atlasJson.json)
                            atlas.texture = texture;

                            const dragonBone = new dragonBones.DragonBonesAsset();
                            dragonBone.dragonBonesJson = JSON.stringify(dragonBonesJson.json);

                            this.res.push({ atlas, dragonBone, name: dir })

                            count--;

                            if (count === 0) fn.call(this);
                        });
                    });
                })
            }
        })
    }
}