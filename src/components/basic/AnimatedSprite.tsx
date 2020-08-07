// @ts-ignore
import { CustomPIXIComponent, SpriteProperties } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

interface IProps extends SpriteProperties {
  textures: PIXI.Texture[];
  maxWidth?: number;
  speed?: number;
}

const getSpriteHeight = (
  textures: PIXI.Texture[],
  maxWidth: number
): number => {
  const texture: PIXI.Texture = textures[0];
  const heightRatio = texture.height / texture.width;

  return maxWidth * heightRatio;
};

const TYPE = "AnimatedSprite";
export const behavior = {
  customDisplayObject: (props: {
    textures: PIXI.Texture[] | PIXI.AnimatedSprite.FrameObject[];
  }) => new PIXI.AnimatedSprite(props.textures),

  customApplyProps: function (
    sprite: { play: () => void },
    oldProps: any,
    newProps: {
      maxWidth: number;
      textures: PIXI.Texture[];
      speed: any;
      width: number;
      height: number;
    }
  ) {
    const props = { ...newProps };

    if (newProps.maxWidth) {
      props.width = newProps.maxWidth;
      props.height = getSpriteHeight(newProps.textures, newProps.maxWidth);
    }
    // @ts-ignore
    props.animationSpeed = 0.167 || newProps.speed;
    setTimeout(() => {
      sprite.play();
    });

    (this as any).applyDisplayObjectProps(oldProps, props);
  },
};
// @ts-ignore
export const AnimatedSprite = CustomPIXIComponent(behavior, TYPE) as React.SFC<
  IProps
>;
