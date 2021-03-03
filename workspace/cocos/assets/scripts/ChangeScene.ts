import { _decorator, Component, Director } from 'cc';
const { ccclass } = _decorator;

interface PageState {
    type: 'MINE_2D',
    lib: string;
    example: string;
    objectCount: number;
    textureCount: number;
    dbCount: number;
    textContent: string;
}

interface SubWindow {
    myData: PageState
}

interface ParentWindow {
    tempData: PageState
}

const selfWindow: SubWindow & Window = window as any

function handleData({ data: newData }: { data: PageState }) {
    if (newData.type !== 'MINE_2D') return;
    if (JSON.stringify(selfWindow.myData) === JSON.stringify(newData)) return;

    selfWindow.myData = newData;

    Director.instance.loadScene(newData.example);
}

window.addEventListener("message", handleData)

@ccclass('ChangeScene')
export class ChangeScene extends Component {
    start() {
        const e = new Event("message");

        (e as any).data = (selfWindow.parent as unknown as ParentWindow).tempData

        // (e as any).data = {
        //     type: "MINE_2D",
        //     lib: "cocos",
        //     example: "spirit-anim",
        //     objectCount: 100,
        //     textureCount: 10,
        //     dbCount: 20,
        //     textContent: "benchmark"
        // }

        window.dispatchEvent(e)
    }
}

export const BASE_URL = 'https://2d-benchmark.oss-cn-hangzhou.aliyuncs.com/assets'