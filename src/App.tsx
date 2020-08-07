import React, { useRef } from "react";
import { Stage } from "react-pixi-fiber";
import { color } from "./utils/color";
import { isIE } from "./utils/userAgent";
import { ViewportContext } from "./constants/ViewportContext";
import { MainScreen } from "./components/environment/MainScreen";
import { useResizeHandler } from "./hooks/useResizeHandler";
import { useResourceLoader } from "./hooks/useResourcesLoader";
import { useFontsLoader } from "./hooks/useFontsLoader";

import "./App.css";
import { MainSpinner } from "./components/environment/MainSpinner";
import {
  resourcesContextValue,
  ResourcesContext,
} from "./constants/ResourcesContext";

const OPTIONS = {
  backgroundColor: color("#29166B"),
  autoResize: true,
  resolution: window.devicePixelRatio || 1,
};

function App(): JSX.Element {
  const [scale, width, height, wrapperRatio] = useResizeHandler();

  const [texturesLoaded, progress] = useResourceLoader();
  const [fontsLoaded] = useFontsLoader();
  const containerRef = useRef<HTMLDivElement>(null);

  const resourcesLoaded = width && height && texturesLoaded && fontsLoaded;

  const getScaleStyle = () => ({
    transform: `scale(${scale})`,
    transformOrigin: "0 0",
    width: `${width * scale}px`,
    height: `${height * scale}px`,
  });

  if (isIE()) {
    return <div>Please, use appropriate browser. (NOTE IE)</div>;
  }

  return (
    <div className="App">
      <ResourcesContext.Provider value={resourcesContextValue} />
      <div ref={containerRef} className="App-container" style={getScaleStyle()}>
        <Stage options={OPTIONS}
         // @ts-ignore
         width={width}
         height={height}
        >
          <ViewportContext.Provider
            value={{ width, height, scale, wrapperRatio }}
          >
            {resourcesLoaded ? (
              <MainScreen />
            ) : (
              <MainSpinner progress={progress} />
            )}
          </ViewportContext.Provider>
        </Stage>
      </div>
    </div>
  );
}

export default App;
