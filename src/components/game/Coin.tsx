import { CustomPIXIComponent, withApp } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import {
  appScreenState$,
  setAppScreenState,
} from "../../states/appScreenState";
import { hitTestRectangle } from "../../utils/hitTestRectangle";
import { isTablet } from "../rooms/GameRoom";

type Props = {
  texture?: any;
  xCoordinate?: number;
  yCoordinate?: number;
  app?: PIXI.Application;
};

// @ts-ignore
const CoinRoadEntity = CustomPIXIComponent<Props, PIXI.Sprite>(
  {
    customDisplayObject: ({ texture }: { texture: PIXI.Texture }) => {
      return new PIXI.Sprite(texture);
    },
    customApplyProps: (
      sprite: PIXI.Sprite,
      _: any,
      { app, xCoordinate = 35, yCoordinate = -160 }: any
    ) => {
      let isCoinAddedToScore = false;
      sprite.setTransform(xCoordinate, yCoordinate);

      const setSpeed = () => {
        return (sprite.y = sprite.y += appScreenState$.value.speed);
      };

      // movement
      app.ticker.add(setSpeed);

      // Checking the Colosseum with a coin and adding it to the score
      app.ticker.add(() => {
        if (isCoinAddedToScore) {
          return;
        }

        if (
          hitTestRectangle(
            appScreenState$.value.boundsMainCar,
            sprite.getBounds()
          )
        ) {
          isCoinAddedToScore = true;
          setAppScreenState({
            coinCount: appScreenState$.value.coinCount += 1,
            speed: appScreenState$.value.speed += 3,
          });
          sprite.blendMode = PIXI.BLEND_MODES.SCREEN;
          animateMovingToCorner(
            sprite,
            app.ticker,
            appScreenState$.value.coinCount
          );
          return;
        }
      });

      return sprite;
    },
  },
  "CoinRoadEntity"
);

export default withApp<any>(CoinRoadEntity);

// @ts-ignore
function animateMovingToCorner(sprite: PIXI.Sprite, ticker, coinCount) {
  const movement = isTablet ? -20 : -10;
  sprite.interactive = true;
  let delta = 1.2;
  ticker.add(() => {
    if (sprite.x < 80 && sprite.y < 150) {
      sprite.alpha = 0;
      return;
    }
    delta -= 0.05;
    if (delta < 0.3) {
      delta = 0.3;
    }
    sprite.setTransform(
      (sprite.x += movement * coinCount * 4),
      (sprite.y += movement * coinCount * 4),
      delta,
      delta
    );
  });
}
