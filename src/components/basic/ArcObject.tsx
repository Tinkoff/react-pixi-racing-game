import {CustomPIXIComponent} from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import {color as getColor} from '../../utils/color';

interface IProps {
  x: number;
  y: number;
  radius: number;
  percent: number;
  color: string;
  border: number;
  alpha?: number;
}

const TYPE = 'ArcObject';
export const behavior = {
  customDisplayObject: () => new PIXI.Graphics(),
  customApplyProps: function(ctx: PIXI.Graphics, oldProps: any, newProps: { x: any; y: any; radius: any; percent: any; color: any; alpha: any; }) {
    const {x, y, radius, percent, color, alpha} = newProps;

    ctx.x = x;
    ctx.y = y;

    if (alpha !== undefined) {
      ctx.alpha = alpha;
    }

    const startAngle = (Math.PI / 200) * percent;
    const endAngle = startAngle + (Math.PI / 50) * percent;

    ctx.clear();
    ctx.beginFill(getColor(color));
    ctx.arc(0, 0, radius, startAngle, endAngle);
    ctx.endFill();
  },
};
export default CustomPIXIComponent(behavior, TYPE) as React.SFC<IProps>;
