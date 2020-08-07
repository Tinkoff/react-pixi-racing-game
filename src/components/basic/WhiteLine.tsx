import {CustomPIXIComponent} from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import {color as getColor} from '../../utils/color';

interface IProps {
  x: number;
  x2: number;
  y: number;
  y2: number;
  color: string;
  thickness: number;
  alpha?: number;
}

const TYPE = 'WhiteLine';
export const behavior = {
  customDisplayObject: () => new PIXI.Graphics(),
  customApplyProps: function(ctx: PIXI.Graphics, oldProps: any, newProps: { x: any; y: any; x2: any; y2: any; color: any; thickness: any; alpha?: 1 | undefined; }) {
    const {x, y, x2, y2, color, thickness, alpha = 1} = newProps;

    if (alpha !== undefined) {
      ctx.alpha = alpha;
    }

    ctx.clear();
    ctx.moveTo(x, y);
    ctx.lineStyle(thickness, getColor(color), alpha);
    ctx.lineTo(x2, y2);
  },
};
export default CustomPIXIComponent(behavior, TYPE) as React.SFC<IProps>;
