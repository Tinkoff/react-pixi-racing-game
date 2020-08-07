import {useState, useEffect} from 'react';
import FontFaceObserver from 'fontfaceobserver';

export const useFontsLoader = (): [boolean] => {
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    const font = new FontFaceObserver('pfhighway');

    font.load().then(() => {
      setLoaded(true);
    });
  }, []);

  return [loaded];
};
