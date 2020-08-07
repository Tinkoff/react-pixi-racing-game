// @ts-ignore
import { CustomPIXIComponent, Behavior, withApp } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

import {
  appScreenState$,
  setAppScreenState,
} from "../../states/appScreenState";
const MAX_LEFT_RANGE_VALUE = 45;
const MAX_RIGHT_RANGE_VALUE = 555;
const CAR_STEP = 170;

const setCarCoordinates = (carSprite: PIXI.AnimatedSprite) => () =>
  setAppScreenState({ boundsMainCar: carSprite.getBounds() });
const speedUp = (sprite: PIXI.AnimatedSprite) => () =>
  appScreenState$.value.coinCount &&
  (sprite.animationSpeed = 0.2 * appScreenState$.value.coinCount);

const handleKeydown = (sprite: {
  xSetter: (arg0: {
    (xCoordinate: any): number;
    (xCoordinate: any): number;
  }) => void;
}) => (e: KeyboardEvent) => {
  if (e.code === "ArrowLeft") {
    sprite.xSetter(moveLeft);
  }

  if (e.code === "ArrowRight") {
    sprite.xSetter(moveRight);
  }
};

export const moveLeft = (xCoordinate: number): number => {
  return xCoordinate !== MAX_LEFT_RANGE_VALUE
    ? xCoordinate - CAR_STEP
    : xCoordinate;
};
export const moveRight = (xCoordinate: number): number => {
  return xCoordinate !== MAX_RIGHT_RANGE_VALUE
    ? xCoordinate + CAR_STEP
    : xCoordinate;
};
type Props = {
  x: number;
  y: number;
  xSetter: Function;
  app: PIXI.Application;
  texture1: PIXI.Texture;
  texture2: PIXI.Texture;
  texture3: PIXI.Texture;
};

let appInstance: PIXI.Application;

const behavior: Behavior<Props, any> = {
  // @ts-ignore
  customDisplayObject: ({ y, x, texture1, texture2, texture3, app }) => {
    const sprite = new PIXI.AnimatedSprite([texture1, texture2, texture3]);
    appInstance = app;
    sprite.play();

    sprite.animationSpeed = 0.2;
    sprite.x = x;
    sprite.y = y;

    // Закидываем в стейт приложения координаты машинки
    app.ticker.add(setCarCoordinates(sprite));

    app.ticker.add(speedUp(sprite));

    return sprite;
  },

  customDidAttach: (sprite: {
    xSetter: (arg0: {
      (xCoordinate: any): number;
      (xCoordinate: any): number;
    }) => void;
  }) => {
    window.addEventListener("keydown", handleKeydown(sprite));
  },

  customWillDetach(sprite: PIXI.AnimatedSprite) {
    appInstance.ticker.remove(setCarCoordinates(sprite));
    appInstance.ticker.remove(speedUp(sprite));
    // @ts-ignore
    window.removeEventListener("keydown", handleKeydown(sprite));
  },
};

export default withApp<any>(CustomPIXIComponent(behavior, "MainCar"));
