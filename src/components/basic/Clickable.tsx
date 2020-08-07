// @ts-ignore
import {ContainerProperties, CustomPIXIComponent} from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import noop from '../../utils/noop';

interface IProps extends ContainerProperties {
  onClick: Function;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  interactive?: boolean;
}

const TYPE = 'Clickable';

const updateEvents = function(ctx: PIXI.Container, obj: any) {
  removeEvents(ctx);

  ctx.on('pointerdown', obj.onClick);

  if (obj.onMouseOver) {
    ctx.on('mouseover', obj.onMouseOver);
  }

  if (obj.onMouseOut) {
    ctx.on('mouseout', obj.onMouseOut);
  }
};

const removeEvents = function(ctx: PIXI.Container) {
  ctx.removeAllListeners('pointerdown');
  ctx.removeAllListeners('mouseover');
  ctx.removeAllListeners('mouseout');
};

const behavior = {
  customDisplayObject: (props: { interactive: boolean; }) => {
    const ctx = new PIXI.Container();

    ctx.interactive = props.interactive || true;

    return ctx;
  },

  customDidAttach: function(ctx: PIXI.Container) {
    // ctx.interactive = true;
    ctx.cursor = 'pointer';
    ctx.buttonMode = true;
    ctx.name = 'clickable';

    updateEvents(ctx, this);
  },

  customWillDetach: function(ctx: PIXI.Container) {
    removeEvents(ctx);
  },

  customApplyProps: function(ctx: PIXI.Container, oldProps: any, newProps: { onClick: any; onMouseOver: any; onMouseOut: any; }) {
    updateEvents(ctx, {
      onClick: newProps.onClick || noop,
      onMouseOver: newProps.onMouseOver || noop,
      onMouseOut: newProps.onMouseOut || noop,
    });

    (this as any).applyDisplayObjectProps(oldProps, newProps);
  },
};

// @ts-ignore
export default CustomPIXIComponent(behavior, TYPE) as React.FunctionComponent<IProps>;
