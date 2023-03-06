import React from 'react';

import { NotificationProvider } from './src/context/AddItemNotificationProvider';
import { ShoppingCartContextProvider } from './src/context/ShoppingCartContextProvider';

export const wrapRootElement = ({ element }) => (
  <ShoppingCartContextProvider>
    <NotificationProvider>
      {element}
    </NotificationProvider>
  </ShoppingCartContextProvider>
);
