import React, { memo, useContext, useState } from "react";
import { Container, withApp } from "react-pixi-fiber";
import { MainWrapper } from "../environment/MainWrapper";
import Road from "../game/Road";
import { ResourcesContext } from "../../constants/ResourcesContext";
import MainCar from "../game/MainCar";
import { ControlElements } from "../game/ControlElement";
import { TapMoverMainCar } from "../game/TapMoverMainCar";
import { ScoreTable } from "../game/ScoreTable";
import { ElapsedTimer } from "../game/ElapsedTimer";
import { SpriteButton } from "../basic/SpriteButton";
import Clickable from "../basic/Clickable";
import { CarAndCoinsLayer } from "../game/CarAndCoinsLayer";
import {
  setAppScreenState,
  useAppScreenState,
} from "../../states/appScreenState";
import { MenuLayout } from "../game/Menu";
import { useMedia } from "react-use";
const doNothing = () => {};
export const isTablet = window.innerWidth < 1024;
export enum trackCoordinates {
  firstTrack = 45,
  secondTrack = 215,
  thirdTrack = 385,
  fourthTrack = 555,
}

const PauseButton = withApp(
  ({
    texture,
    width,
    app,
  }: {
    texture: PIXI.Texture;
    width: number;
    app: any;
  }) => {
    return (
      <Clickable
        onClick={() => {
          setAppScreenState({ pause: true });
          setTimeout(() => app.ticker.stop(), 100);
        }}
      >
        <SpriteButton
          texture={texture}
          x={isTablet ? width - 110 : width + 50}
          y={33}
        />
      </Clickable>
    );
  }
);

export const GameRoom = memo(() => {
  const { resources } = useContext(ResourcesContext);
  const [mainCarXCoordinate, setMainCarXCoordinate] = useState<number>(385);
  const isGameEnd = useAppScreenState<boolean>("endGame");
  const isPause = useAppScreenState<boolean>("pause");
  const timeout = useAppScreenState("timeout");
  const coinCount = useAppScreenState<number>("coinCount");
  const isDisableControls = useAppScreenState("disableControls");
  const isPhone = useMedia("(max-width: 480px)");

  if (isGameEnd || timeout) {
    alert(`Game over. You got ${coinCount} coins.`);
  }

  if (coinCount === 5) {
    alert("You win");
    window.location.reload();
  }

  return (
    <Container name="GameRoom">
      <MainWrapper
        render={(width, height) => (
          <TapMoverMainCar
            mainCarXCoordinate={mainCarXCoordinate}
            setMainCarXCoordinate={
              isDisableControls ? doNothing : setMainCarXCoordinate
            }
          >
            <Road
              x={0}
              y={0}
              width={isPhone ? width * 2 : width}
              height={isPhone ? 2000 : height}
              texture={resources.road.texture}
            />
            <CarAndCoinsLayer />
            <MainCar
              texture1={resources.car.texture}
              texture2={resources.carOpacity25.texture}
              texture3={resources.carOpacity5.texture}
              y={isPhone ? height * 2.1 : height / 1.5}
              x={mainCarXCoordinate}
              xSetter={setMainCarXCoordinate}
            />
            <ControlElements
              resources={resources}
              width={isPhone ? width * 1.6 : width}
              height={isPhone ? height * 2.6 : height}
              xSetter={isDisableControls ? doNothing : setMainCarXCoordinate}
            />
            <ScoreTable texture={resources.coin.texture} />
            <ElapsedTimer width={isPhone ? width * 1.6 : width} />
            <PauseButton
              width={isPhone ? width * 1.6 : width}
              texture={
                isTablet
                  ? resources.pauseButton.texture
                  : resources.pauseButtonLarge.texture
              }
            />
          </TapMoverMainCar>
        )}
      />
      <MenuLayout
        isGameEnd={isGameEnd}
        isPause={isPause}
        width={isPhone ? window.innerWidth * 1.6 : window.innerWidth}
        height={isPhone ? window.innerHeight * 1.6 : window.innerHeight}
        onExitClickCallBack={() => alert(coinCount)}
      />
    </Container>
  );
});
