import { CustomPIXIComponent, withApp } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import {
  appScreenState$,
  setAppScreenState,
} from "../../states/appScreenState";
import { hitTestRectangle } from "../../utils/hitTestRectangle";

type Props = {
  texture?: any;
  xCoordinate?: number;
  yCoordinate?: number;
  app?: PIXI.Application;
};

// @ts-ignore
const CarEnemy = CustomPIXIComponent<Props, PIXI.Sprite>(
  {
    customDisplayObject: ({ texture }: { texture: PIXI.Texture }) => {
      return new PIXI.Sprite(texture);
    },
    customApplyProps: (
      sprite: PIXI.Sprite,
      _: any,
      { app, xCoordinate = 35, yCoordinate = -160 }: any
    ) => {
      sprite.setTransform(xCoordinate, yCoordinate);
      const speed = () => {
        return (sprite.y = sprite.y += appScreenState$.value.speed);
      };
      // Car movement
      app.ticker.add(speed);

      // Checking for collisions between the current car and the main one
      app.ticker.add(() => {
        const collisionWithMainCar = hitTestRectangle(
          { ...appScreenState$.value.boundsMainCar, height: 50 },
          sprite.getBounds()
        );
        if (collisionWithMainCar) {
          // In case of an accident, disable all EventListener's to disable movement
          window.addEventListener(
            "keydown",
            function (event) {
              event.stopPropagation();
            },
            true
          );

          setAppScreenState({ speed: 0.3, disableControls: true });
          setTimeout(() => (sprite.alpha = 1), 100);
          setTimeout(() => (sprite.alpha = 0), 200);
          setTimeout(() => (sprite.alpha = 1), 300);
          setTimeout(() => (sprite.alpha = 0), 400);
          setTimeout(() => (sprite.alpha = 1), 400);
          setTimeout(() => (sprite.alpha = 0), 500);
          setTimeout(() => (sprite.alpha = 1), 600);
          setTimeout(() => (sprite.alpha = 0), 700);
          setTimeout(() => (sprite.alpha = 1), 800);
          setTimeout(() => (sprite.alpha = 0), 900);
          setTimeout(() => (sprite.alpha = 1), 1000);
          setTimeout(() => {
            sprite.alpha = 1;
            // @ts-ignore
            setAppScreenState({ endGame: true });
          }, 1100);
          setTimeout(() => app.ticker.stop(), 1200);
        }
      });

      return sprite;
    },
  },
  "CarEnemy"
);

export default withApp<any>(CarEnemy);
