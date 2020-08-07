import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

interface IProps {
  x: number;
  y: number;
  width: number;
  height: number;
  texture: PIXI.Texture;
  app?: PIXI.Application;
}

const TYPE = "Road";

let interval: NodeJS.Timeout | null = null;

export const behavior = {
  customDisplayObject: (props: {
    texture: PIXI.Texture;
    width: number | undefined;
    height: number | undefined;
    x: number;
    y: number;
  }) => {
    const sprite = new PIXI.TilingSprite(
      props.texture,
      props.width,
      props.height
    );

    sprite.x = props.x;
    sprite.y = props.y;

    interval = setInterval(() => {
      sprite.tilePosition.y += 10;
    }, 40);
    return sprite;
  },

  customWillDetach: function () {
    // @ts-ignore
    clearInterval(interval);
  },
};
export default CustomPIXIComponent(behavior, TYPE) as React.SFC<IProps>;
