import {SpriteButton} from '../basic/SpriteButton';
import Clickable from '../basic/Clickable';
import {moveLeft, moveRight} from './MainCar';
import React from 'react';

const TABLET_CONTROL_WIDTH = 80;
const TABLET_CONTROL_INDENT = 36;

// @ts-ignore
export const ControlElements = ({width, height, xSetter, resources}) => {
  const desktopX = width / 2 - 70;
  const desktopY = height - 135;
  const isTablet = window.innerWidth < 1024;

  if (isTablet) {
    return (
      <>
        <Clickable onClick={(e: { stopPropagation: () => any; }) => e.stopPropagation() || xSetter(moveLeft)}>
          <SpriteButton texture={resources.leftButtonTablet.texture} x={TABLET_CONTROL_INDENT} y={desktopY} />
        </Clickable>
        <Clickable onClick={(e: { stopPropagation: () => any; }) => e.stopPropagation() || xSetter(moveRight)}>
          <SpriteButton
            texture={resources.rightButtonTablet.texture}
            x={width - TABLET_CONTROL_WIDTH - TABLET_CONTROL_INDENT}
            y={desktopY}
          />
        </Clickable>
      </>
    );
  }

  return (
    <>
      <SpriteButton texture={resources.keyboard.texture} x={desktopX} y={desktopY} />
      <Clickable onClick={() => xSetter(moveLeft)}>
        <SpriteButton texture={resources.leftButtonKeyboard.texture} x={desktopX} y={desktopY} />
      </Clickable>
      <Clickable onClick={() => xSetter(moveRight)}>
        <SpriteButton texture={resources.rightButtonKeyboard.texture} x={desktopX + 100} y={desktopY} />
      </Clickable>
    </>
  );
};
