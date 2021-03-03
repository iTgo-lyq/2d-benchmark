import { GameObject } from '@eva/eva.js';
import { Text } from '@eva/plugin-renderer-text';
import { createContainer } from './util';

const params = {
  textContent: "benchmark",
  objectCount: 1,
}

export default async function ({ textContent, objectCount } = params) {
  const container = createContainer();;

  if (!textContent) return container;

  while (objectCount > 0) {
    const text = new GameObject("text", {
      position: {
        x: Math.random() * 920,
        y: Math.random() * 600,
      },
      origin: {
        x: 0.5,
        y: 0.5
      },
      anchor: {
        x: 0.5,
        y: 0.5
      }
    });

    text.addComponent(new Text({
      text: textContent,
      style: {
        fontFamily: "Arial",
        fontSize: 36,
        fontStyle: "italic",
        fontWeight: "bold",
        fill: ["#b35d9e", "#84c35f", "#ebe44f"],
        fillGradientType: 1,
        fillGradientStops: [0.1, 0.4],
        stroke: "#4a1850",
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: "#000000",
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 400,
        breakWords: true
      }
    }));

    container.addChild(text);

    objectCount--;
  }

  return container;
}

