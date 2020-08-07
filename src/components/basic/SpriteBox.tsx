import {Sprite} from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import React from 'react';
import {clamp} from '../../utils/clamp';

interface IProps {
  texture: PIXI.Texture;
  x: number;
  y: number;
  anchor?: string;
  width?: number;
  height?: number;
  alpha?: number;
  angle?: number;
}

export const SpriteBox: React.FC<IProps> = ({texture, width, anchor = '0,0', height, ...rest}) => {
  let finalWidth = texture.width;
  let finalHeight = texture.height;

  if (!width) {
    width = texture.width;
  }

  if (!height) {
    height = texture.height;
  }

  const textureRatio = texture.width / texture.height;
  const viewportRatio = width / height;
  const isScaledByHeight = textureRatio > viewportRatio;

  if (isScaledByHeight) {
    finalWidth = clamp(texture.width, 0, width);
    finalHeight = finalWidth / textureRatio;
  } else {
    finalHeight = clamp(texture.height, 0, height);
    finalWidth = finalHeight * textureRatio;
  }

  return (
    <>
      <Sprite texture={texture} width={finalWidth} height={finalHeight} anchor={anchor as any} {...rest} />
    </>
  );
};
