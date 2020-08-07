import * as PIXI from 'pixi.js';
import React, {useState, useLayoutEffect} from 'react';
import Clickable from './Clickable';
import {SpriteBox} from './SpriteBox';
import {isTouchDevice} from '../../utils/isTouchDevice';

interface IProps {
  texture: PIXI.Texture;
  hoverTexture?: PIXI.Texture;
  activeTexture?: PIXI.Texture;
  x: number;
  y: number;
  width?: number;
  height?: number;
  onClick?: () => void;
  anchor?: string;
  active?: boolean;
  disabled?: boolean;
}

const isTouch = isTouchDevice();

export const SpriteButton: React.FC<IProps> = ({
  texture,
  activeTexture,
  hoverTexture,
  active,
  onClick,
  disabled,
  ...rest
}) => {
  const [currentTexture, setCurrentTexture] = useState(texture);

  useLayoutEffect(() => {
    setCurrentTexture(texture);
  }, [texture]);

  const handleMouseOver = () => {
    if (hoverTexture) {
      setCurrentTexture(hoverTexture);
    }
  };

  const handleMouseOut = () => {
    if (hoverTexture) {
      setCurrentTexture(texture);
    }
  };

  const handleClick = () => {
    if (isTouch) {
      handleMouseOver();

      setTimeout(handleMouseOut, 100);
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <Clickable onClick={handleClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <SpriteBox texture={currentTexture} {...rest} />
    </Clickable>
  );
};
