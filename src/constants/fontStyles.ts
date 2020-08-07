import {color} from '../utils/color';

const BASE_STYLES = {
  fontFamily: 'PT Sans',
  fontSize: 25,
  letterSpacing: 0,
};

export const getDefaultTextStyle = (styles: any) => ({
  ...BASE_STYLES,
  ...styles,
});

const CENTER_ANCHOR = {x: 0.5, y: 0.5} as any;

export const H1_TEXT = {
  anchor: CENTER_ANCHOR,
  style: getDefaultTextStyle({
    fill: color('#A3FF00'),
    fontSize: 50,
  }),
};

export const H2_TEXT = {
  anchor: CENTER_ANCHOR,
  style: getDefaultTextStyle({
    fill: color('#A3FF00'),
    fontSize: 25,
  }),
};
