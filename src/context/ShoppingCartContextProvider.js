import React from 'react';
import { createContext, useContext, useState } from 'react'

const defaultState = {
  cart: [],
}
const ShoppingCartContext = createContext(defaultState)

export const ShoppingCartContextProvider = ({ children }) => {
  const [data, setData] = useState(defaultState)
  const updateState = (_data) => setData(_data)

  const contextValues = {
    data,
    updateState,
  }

  return <ShoppingCartContext.Provider value={contextValues}>{children}</ShoppingCartContext.Provider>
}

export const useShoppingCartContext = () => {
  const context = useContext(ShoppingCartContext)
  if (context === undefined || context === null) {
    throw new Error(`useShoppingCartContext must be called within ShoppingCartContextProvider`)
  }
  return context
}