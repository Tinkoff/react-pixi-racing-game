import React, { useContext } from "react";
// @ts-ignore
import { Text, TextProperties } from "react-pixi-fiber";
import { ViewportContext } from "../constants/ViewportContext";

export interface IProps extends TextProperties {
  size: number;
  ref?: React.MutableRefObject<PIXI.Text>;
}

export const generateTextComponent = (baseStyle: {
  style: any;
  anchor?: any;
  x?: number;
  y?: number;
}): React.FC<IProps> =>
  React.forwardRef<PIXI.Text, IProps>(({ size, ...rest }, ref) => {
    const { height, scale } = useContext(ViewportContext);

    const textProps = { ...baseStyle, ...rest };
    const isDesktop = height > 600 && scale === 1;

    textProps.style = {
      ...textProps.style,
      fontSize: isDesktop ? size : size / (1.4 * scale),
    };

    return React.createElement(Text, { ...textProps, ref });
  });
