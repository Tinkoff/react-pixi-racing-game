import {Container} from 'react-pixi-fiber';
import React, {useContext} from 'react';
import {clamp} from '../../utils/clamp';
import {ViewportContext} from '../../constants/ViewportContext';
import {useMedia} from 'react-use';

interface IProps {
  maxWidth?: number;
  render: (width: number, height: number) => JSX.Element;
}

export const MainWrapper: React.FC<IProps> = ({render, maxWidth = 664}) => {
  const {width, height} = useContext(ViewportContext);
  const isPhone = useMedia('(max-width: 480px)');

  const maxHeight = window.innerHeight;
  const textureRatio = maxWidth / maxHeight;
  const viewportRatio = width / height;
  const isScaledByHeight = textureRatio > viewportRatio;

  let finalWidth;
  let finalHeight;
  const paddings = 0;

  if (isScaledByHeight) {
    finalWidth = clamp(maxWidth, 320, width);
    finalHeight = finalWidth / textureRatio;
  } else {
    finalHeight = clamp(maxHeight, 568, height - paddings);
    finalWidth = finalHeight * textureRatio;
  }

  const leftOffset = (width - finalWidth) / 2;
  const topOffset = (height - finalHeight) / 2;
  return (
    <Container
      x={isPhone ? 0 : leftOffset}
      y={isPhone ? 0 : topOffset}
      width={finalWidth}
      height={finalHeight}
      name="MainWrapper"
      {...(isPhone ? {scale: {x: 0.6, y: 0.6}} : {})}
    >
      {render(finalWidth, finalHeight)}
    </Container>
  );
};
