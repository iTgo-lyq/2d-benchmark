
import { _decorator, Component, Node, Label, Color, Overflow, UITransform, LabelOutline, Canvas } from 'cc';
const { ccclass } = _decorator;

interface Params {
    textContent: string,
    objectCount: number,
}

@ccclass('TextPlayer')
export class TextPlayer extends Component {
    start() {
        let { textContent, objectCount } = (window as any).myData as Params

        if (!textContent) return;

        while (objectCount > 0) {
            const node = new Node("text" + objectCount);

            node.addComponent(Canvas)
            const label = node.addComponent(Label);

            node.addComponent(LabelOutline);

            label.fontSize = 36;
            label.string = textContent;
            label.color = Color.RED;
            label.overflow = Overflow.CLAMP;

            const ui = node.getComponent(UITransform);

            ui!.width = 600;
            ui!.height = 100;

            node.position.set((Math.random() - 0.5) * 960, (Math.random() - 0.5) * 640, 0)

            this.node.addChild(node);
            
            objectCount--;
        }
    }
}