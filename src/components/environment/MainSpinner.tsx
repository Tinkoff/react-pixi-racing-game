import {Container} from 'react-pixi-fiber';
import React, {useContext} from 'react';
import BoxObject from '../basic/BoxObject';
import {ViewportContext} from '../../constants/ViewportContext';
import ArcObject from '../basic/ArcObject';

interface IProps {
  progress: number;
}

export const MainSpinner: React.FC<IProps> = ({progress}) => {
  const viewport = useContext(ViewportContext);
  const size = Math.min(viewport.width, viewport.height);

  return (
    <Container x={0} y={0} name="MainSpinner">
      <BoxObject x={0} y={0} width={viewport.width} height={viewport.height} color={'#000000'} />

      <ArcObject
        x={viewport.width / 2}
        y={viewport.height / 2}
        radius={size * 0.3}
        border={10}
        percent={progress}
        color={'#ffffff'}
        alpha={0.5}
      />

      <ArcObject
        x={viewport.width / 2}
        y={viewport.height / 2}
        radius={size * 0.295}
        border={10}
        percent={100}
        color={'#000000'}
        alpha={1}
      />

      {/* <MainWrapper render={(width, height) => (
        <BoxObject x={0} y={0} width={width * (progress / 100)} height={10} color={'#ffffff'} alpha={0.5}/>
      )} /> */}
    </Container>
  );
};
