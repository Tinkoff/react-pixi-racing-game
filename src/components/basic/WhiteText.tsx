import {getDefaultTextStyle} from '../../constants/fontStyles';
import {generateTextComponent} from '../../utils/generateTextComponent';
import {color} from '../../utils/color';
import {generateAutoMeasureTextComponent} from '../../utils/generateAutoMeasureTextComponent';

const CENTER_ANCHOR = {x: 0.5, y: 0.5} as any;

const style = {
  anchor: CENTER_ANCHOR,
  style: getDefaultTextStyle({
    fill: color('#FFFFFF'),
    fontSize: 30,
  }),
};

export const PurpleText = generateTextComponent({style: getDefaultTextStyle({fill: '#452BA5', fontSize: 32})});
export const WhiteText = generateTextComponent(style);
export const WhiteTextAutoFit = generateAutoMeasureTextComponent(style);
