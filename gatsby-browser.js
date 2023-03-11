import React from 'react';

import { ShoppingCartContextProvider } from './src/context/ShoppingCartContextProvider';

export const wrapRootElement = ({ element }) => (
  <ShoppingCartContextProvider>
    {element}
  </ShoppingCartContextProvider>
);
