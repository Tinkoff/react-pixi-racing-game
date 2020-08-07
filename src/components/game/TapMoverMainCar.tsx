import React, { ReactNode } from "react";
import Clickable from "../basic/Clickable";
import { moveLeft, moveRight } from "./MainCar";
import { trackCoordinates } from "../rooms/GameRoom";

export const TapMoverMainCar = ({
  children,
  mainCarXCoordinate,
  setMainCarXCoordinate,
}: {
  children: ReactNode;
  mainCarXCoordinate: number;
  setMainCarXCoordinate: Function;
}) => {
  return (
    <Clickable
      onClick={(e: { data: { global: { x: any } } }) => {
        // tap movement
        const clickCoordinateX = e.data.global.x;
        const windowWidth = window.innerWidth;
        const pivot = windowWidth / 2;
        const isLeftTap = clickCoordinateX < pivot;

        if (windowWidth > 1024) {
          return;
        }

        if (
          mainCarXCoordinate === trackCoordinates.firstTrack &&
          pivot - 170 > mainCarXCoordinate
        ) {
          setMainCarXCoordinate(moveRight);
          return;
        }

        if (isLeftTap && mainCarXCoordinate === trackCoordinates.secondTrack) {
          setMainCarXCoordinate(moveLeft);
          return;
        }

        if (
          mainCarXCoordinate === trackCoordinates.secondTrack &&
          pivot > mainCarXCoordinate
        ) {
          setMainCarXCoordinate(moveRight);
          return;
        }

        if (isLeftTap && mainCarXCoordinate === trackCoordinates.thirdTrack) {
          setMainCarXCoordinate(moveLeft);
          return;
        }

        if (
          pivot + 340 > mainCarXCoordinate &&
          mainCarXCoordinate === trackCoordinates.thirdTrack
        ) {
          setMainCarXCoordinate(moveRight);
          return;
        }

        if (mainCarXCoordinate === trackCoordinates.fourthTrack) {
          setMainCarXCoordinate(moveLeft);
          return;
        }
      }}
    >
      {children}
    </Clickable>
  );
};
