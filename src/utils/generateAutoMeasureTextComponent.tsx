import React from "react";
import * as PIXI from "pixi.js";
// @ts-ignore
import { Text, TextProperties } from "react-pixi-fiber";

export interface IProps extends TextProperties {
  size: number;
  width: number;
}

const cache = new Map<string, number>();

export const generateAutoMeasureTextComponent = (
  baseStyle: any
): React.FC<IProps> => ({ size, width, ...rest }) => {
  const textProps = Object.assign(baseStyle, rest);

  textProps.style = new PIXI.TextStyle({
    ...textProps.style,
    fontSize: size,
  });

  if (cache.has(`${size}:${textProps.text.length}`)) {
    textProps.style.fontSize = cache.get(`${size}:${textProps.text.length}`);
  } else {
    let triesCount = 50;

    while (--triesCount) {
      const textMetrics = PIXI.TextMetrics.measureText(
        textProps.text,
        textProps.style
      ) as {
        width: number;
        height: number;
      };

      if (textMetrics.width > width) {
        textProps.style.fontSize--;
      } else {
        cache.set(`${size}:${textProps.text.length}`, textProps.style.fontSize);
        break;
      }
    }
  }

  return React.createElement(Text, textProps);
};
