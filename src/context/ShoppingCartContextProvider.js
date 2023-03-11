import React from 'react';
import { createContext, useContext, useState } from 'react'

const defaultState = {
  cart: [],
  activeProduct: null
}
const ShoppingCartContext = createContext(defaultState)

export const ShoppingCartContextProvider = ({ children }) => {
  const [data, setData] = useState(defaultState);

  const upsertCartItemById = (cartItem) => {
    const { cartItemId } = cartItem;
    setData((prevData) => {
      const { cart } = data;
      const ix = cart.findIndex(item => item.cartItemId === cartItemId);
      if (ix > -1) {
        cart[ix] = cartItem;
        return {
          ...prevData,
          cart
        };
      }

      return {
        ...prevData,
        cart: [...cart, cartItem]
      }
    });
  };

  const removeCartItemByid = (cartItemId) => {
    setData((prevData) => ({
      ...prevData,
      cart: prevData.cart.filter(item => item.cartItemId !== cartItemId)
    }))
  }

  const resetCart = () => {
    setData((prevData) => ({
      ...prevData,
      cart: []
    }))
  }

  const setActiveProduct = (product) => {
    setData((prevData) => ({
      ...prevData,
      activeProduct: product
    }))
  }

  const contextValues = {
    data,
    resetCart,
    setActiveProduct,
    upsertCartItemById,
    removeCartItemByid
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