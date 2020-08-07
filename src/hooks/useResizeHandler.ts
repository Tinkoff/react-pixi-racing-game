import {useState, useLayoutEffect} from 'react';
import {clamp} from '../utils/clamp';
import {debounce} from '../utils/debounce';

// const MIN_WIDTH = 310;
const MIN_WIDTH = 400;
// const MIN_HEIGHT = 480;
const MIN_HEIGHT = 680;

export const getSizeDimensions = () => {
  const {innerWidth, innerHeight} = window;
  const width = innerWidth;
  const height = innerHeight;

  const textureRatio = MIN_WIDTH / MIN_HEIGHT;
  const viewportRatio = width / height;

  const isScaledByHeight = textureRatio > viewportRatio;
  let finalWidth = 0;
  let finalHeight = 0;
  let newScale = 1;

  if (isScaledByHeight) {
    finalWidth = clamp(width, MIN_WIDTH, width);
    newScale = width / finalWidth;
    finalHeight = height / newScale;
  } else {
    finalHeight = clamp(height, MIN_HEIGHT, height);
    newScale = height / finalHeight;
    finalWidth = width / newScale;
  }

  // const newWidth = clamp(width, MIN_WIDTH, Number.MAX_SAFE_INTEGER);
  // const newScale = width / newWidth;
  // const newHeight = clamp(width, MIN_HEIGHT, Number.MAX_SAFE_INTEGER) / newScale;

  return [newScale, finalWidth, finalHeight, newScale];
};

export const useResizeHandler = (): [number, number, number, number] => {
  const [[scale, width, height, wrapperRatio], setState] = useState([1, window.innerWidth, window.innerHeight, 1]);

  useLayoutEffect(() => {
    const handleResize = debounce(() => {
      const [newScale, newtWidth, newHeight, newWrapperRatio] = getSizeDimensions();

      setState([newScale, newtWidth, newHeight, newWrapperRatio]);
    }, 100);

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return [scale, width, height, wrapperRatio];
};
