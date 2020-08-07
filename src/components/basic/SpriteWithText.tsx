import React from 'react';
import * as PIXI from 'pixi.js';
import {Container} from 'react-pixi-fiber';
import {SpriteBox} from './SpriteBox';
import {WhiteText} from './WhiteText';
import {color} from '../../utils/color';

interface IProps {
  x: number;
  y: number;
  width: number;
  height: number;
  texture: PIXI.Texture;
  title: string;
  description: string;
}
const isTablet = window.innerWidth < 1024;

export const SpriteWithText: React.FC<IProps> = ({x, y, height, texture, title, description}) => {
    return (
    <Container x={x} y={y}>
      <SpriteBox texture={texture} x={0} y={0} width={height} height={height} />

      <WhiteText
        // @ts-ignore
        x={isTablet ? 35 : 43}
        y={isTablet ? 2 : -5}
        size={isTablet ? 16 : 32}
        anchor={'0,0'}
        text={title}
        style={{
          fill: color('#ffffff'),
          wordWrap: true,
          wordWrapWidth: 160,
          fontWeight: 900,
        }}
      />

      <WhiteText
        // @ts-ignore
        x={160}
        y={60}
        size={14}
        anchor={'0,0'}
        text={description}
        style={{
          fill: color('#ffffff'),
          wordWrap: true,
          wordWrapWidth: 160,
        }}
      />
    </Container>
  );
};
