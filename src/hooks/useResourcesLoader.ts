import {useState, useEffect} from 'react';
import {resources} from '../constants/resourcesList';
import * as PIXI from 'pixi.js';
import {resourcesContextValue} from '../constants/ResourcesContext';

export const useResourceLoader = (): [boolean, number] => {
  const [loaded, setLoaded] = useState(false);
  const [progress] = useState(0);

  useEffect(() => {
    const loader = new PIXI.Loader();

    for (let key in resources) {
      // @ts-ignore
      loader.add(key, resources[key]);
    }

    loader
        // @ts-ignore
        // .pre(e => setProgress(e.progress))
        // @ts-ignore
      .load((loader, resources) => {
        resourcesContextValue.updateResources(resources);

        setLoaded(true);
      });
  }, []);

  return [loaded, progress];
};
