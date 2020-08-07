import {CustomPIXIComponent} from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import {color as getColor} from '../../utils/color';
import {MutableRefObject} from 'react';

interface IProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  alpha?: number;
  forwardRef?: MutableRefObject<any>;
}

const TYPE = 'BoxObject';
export const behavior = {
  customDisplayObject: () => new PIXI.Graphics(),
  customApplyProps: function(ctx: { clear: () => void; width: any; height: any; x: any; y: any; alpha: any; beginFill: (arg0: number) => void; drawRect: (arg0: number, arg1: number, arg2: any, arg3: any) => void; endFill: () => void; }, oldProps: any, newProps: { x: any; y: any; width: any; height: any; color: any; alpha: any; forwardRef: any; }) {
    const {x, y, width, height, color, alpha, forwardRef} = newProps;

    ctx.clear();

    ctx.width = width;
    ctx.height = height;
    ctx.x = x;
    ctx.y = y;
    if (forwardRef) {
      forwardRef.current = ctx;
    }

    if (alpha !== undefined) {
      ctx.alpha = alpha;
    }

    ctx.beginFill(getColor(color));
    ctx.drawRect(0, 0, width, height);
    ctx.endFill();
  },
};
// @ts-ignore
export default CustomPIXIComponent(behavior, TYPE) as React.SFC<IProps>;
