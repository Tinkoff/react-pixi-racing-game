import React from 'react';

export const ViewportContext = React.createContext({
  width: 0,
  height: 0,
  scale: 1,
  wrapperRatio: 1,
});
