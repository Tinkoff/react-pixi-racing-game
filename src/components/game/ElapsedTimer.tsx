import RoundRectObject from "../basic/RoundRectObject";
import React from "react";
import { generateTextComponent } from "../../utils/generateTextComponent";
import { getDefaultTextStyle } from "../../constants/fontStyles";
import { color } from "../../utils/color";
import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import moment from "moment";
import {
  appScreenState$,
  setAppScreenState,
} from "../../states/appScreenState";
require("moment-duration-format");
const isTablet = window.outerWidth < 1024;

const isWindows = navigator.platform.includes("Win");

const purple = {
  x: isTablet ? 80 : 90,
  y: 15,
  anchor: "0.5,0.5",
  style: getDefaultTextStyle({
    fill: color("#CA90DE"),
  }),
};
const defaultWidth = isTablet ? 153 : 183;
let interval: NodeJS.Timeout;
const Timer = CustomPIXIComponent(
  {
    customDisplayObject: () => {
      const text = new PIXI.Text("00:30:00", {
        fill: color("#FFFFFF"),
        fontSize: isTablet ? 16 : 32,
        fontWeight: 900,
      });
      let counter = 30000;

      interval = setInterval(() => {
        if (appScreenState$.value.pause) {
          return;
        }
        if (counter > 0) {
          text.text = moment
            .duration(counter, "milliseconds")
            // @ts-ignore
            .format("mm:ss:SS", { trim: false });
          counter -= 100;
        }
        if (counter === 0) {
          text.text = "00:00:00";
          setAppScreenState({ timeout: true });
        }
      }, 100);
      // @ts-ignore
      text.anchor = isTablet ? { x: -0.7, y: -1.7 } : { x: -0.23, y: -0.75 };

      return text;
    },
    customWillDetach: () => clearInterval(interval),
  },
  "timer"
);
export const PurpleText = generateTextComponent(purple);
// @ts-ignore
export const ElapsedTimer = ({ width }) => {
  return (
    <>
      <RoundRectObject
        color="#29166B"
        x={width / 2 - (isTablet ? 75 : 90)}
        y={isTablet ? 30 : 20}
        radius={14}
        width={isWindows ? defaultWidth + 32 : defaultWidth}
        height={isTablet ? 58 : 72}
      >
        <PurpleText
          size={12}
          // @ts-ignore
          text="remained"
        />
        <Timer />
      </RoundRectObject>
    </>
  );
};
