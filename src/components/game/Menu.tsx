import React, { useEffect } from "react";
import BoxObject from "../basic/BoxObject";
import WhiteLine from "../basic/WhiteLine";
import Clickable from "../basic/Clickable";
import { PurpleText } from "../basic/WhiteText";
import { setAppScreenState } from "../../states/appScreenState";
import { withApp } from "react-pixi-fiber";
import useMedia from "react-use/lib/useMedia";

export const MenuLayout = withApp(
  ({
    isGameEnd,
    isPause,
    app,
    width,
    height,
    onExitClickCallBack,
  }: {
    isGameEnd: boolean;
    isPause: boolean;
    app: any;
    width: number;
    height: number;
    onExitClickCallBack: Function;
  }) => {
    const isDesktop = useMedia("(min-width: 1280px)");
    const textOffset = isDesktop
      ? window.innerWidth / 2 + 54
      : window.innerWidth / 2 - 100;
    useEffect(() => {
      !isGameEnd && !isPause && app.start();
    });
    return isPause ? (
      <BoxObject
        alpha={isDesktop ? 0.9 : 1}
        width={width}
        height={height}
        color="#f8f6f0"
        y={0}
        x={0}
      >
        {isDesktop && (
          <WhiteLine
            y={0}
            x={window.innerWidth / 2}
            y2={window.innerHeight}
            x2={window.innerWidth / 2}
            color={"#CA90DE"}
            thickness={1}
          />
        )}
        {isPause && (
          <Clickable
            onClick={() => setAppScreenState({ pause: false })}
            // @ts-ignore
            x={textOffset}
            y={window.innerHeight / 2 + 50}
          >
            <PurpleText
              size={32}
              // @ts-ignore
              text="continue"
            />
          </Clickable>
        )}
        <Clickable
          onClick={() => {
            window.location.reload();
          }}
          // @ts-ignore
          x={textOffset}
          y={window.innerHeight / 2 + 120}
        >
          <PurpleText
            size={32}
            // @ts-ignore
            text="start again"
          />
        </Clickable>
        <Clickable
          onClick={onExitClickCallBack}
          // @ts-ignore
          x={textOffset}
          y={window.innerHeight / 2 + 190}
        >
          <PurpleText
            size={32}
            // @ts-ignore
            text="exit"
          />
        </Clickable>
      </BoxObject>
    ) : null;
  }
);
