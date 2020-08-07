import React from "react";
import { Container } from "react-pixi-fiber";
import { ScreenType } from "../../constants/ScreenType";
import { GameRoom } from "../rooms/GameRoom";
import {
  IAppScreenStateData,
  useAppScreenState,
} from "../../states/appScreenState";

interface IProps {}

const screens = {
  [ScreenType.game]: GameRoom,
};

export const MainScreen: React.FC<IProps> = () => {
  const { screen } = useAppScreenState<IAppScreenStateData>();

  return (
    <Container x={0} y={0} name="MainScreen">
      {React.createElement(screens[screen])}
    </Container>
  );
};
