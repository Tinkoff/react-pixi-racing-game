import RoundRectObject from '../basic/RoundRectObject';
import React, {memo} from 'react';
import {useAppScreenState} from '../../states/appScreenState';
import * as PIXI from 'pixi.js';
import {SpriteWithText} from '../basic/SpriteWithText';
const isTablet = window.innerWidth < 1024;

export const ScoreTable = memo<{texture: PIXI.Texture}>(({texture}) => {
  const coinCount = useAppScreenState<number>('coinCount');

  return (
    <>
      <RoundRectObject
        x={window.innerWidth < 1024 ? 29 : -140}
        y={33}
        width={75}
        height={isTablet ? 40 : 48}
        radius={14}
        color="#29166B"
      />
      <SpriteWithText
        x={window.innerWidth < 1024 ? 37 : -140}
        y={41}
        width={isTablet ? 24 : 30}
        height={isTablet ? 24 : 30}
        texture={texture}
        title={`${coinCount.toString()}/5`}
        description={''}
      />
    </>
  );
});
