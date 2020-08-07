import {CustomPIXIComponent} from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import {color as getColor} from '../../utils/color';

interface IProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  radius: number;
  alpha?: number;
}

const TYPE = 'RoundRectObject';
export const behavior = {
  customDisplayObject: () => new PIXI.Graphics(),
  customApplyProps: function(ctx: { clear: () => void; width: any; height: any; x: any; y: any; alpha: any; beginFill: (arg0: number) => void; drawRoundedRect: (arg0: number, arg1: number, arg2: any, arg3: any, arg4: any) => void; endFill: () => void; }, oldProps: any, newProps: { x: any; y: any; width: any; height: any; color: any; radius: any; alpha: any; }) {
    const {x, y, width, height, color, radius, alpha} = newProps;

    ctx.clear();

    ctx.width = width;
    ctx.height = height;
    ctx.x = x;
    ctx.y = y;

    if (alpha !== undefined) {
      ctx.alpha = alpha;
    }

    ctx.beginFill(getColor(color));
    ctx.drawRoundedRect(0, 0, width, height, radius);
    ctx.endFill();
  },
};
// @ts-ignore
export default CustomPIXIComponent(behavior, TYPE) as React.SFC<IProps>;
