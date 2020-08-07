import React from 'react';
import {resources} from './resourcesList';
import * as PIXI from 'pixi.js';

export const resourcesContextValue = {
  resources: {} as {[key in keyof typeof resources]: PIXI.LoaderResource},

// @ts-ignore
  updateResources: resources => {
    resourcesContextValue.resources = resources;
  },
};

export const ResourcesContext = React.createContext(resourcesContextValue);
