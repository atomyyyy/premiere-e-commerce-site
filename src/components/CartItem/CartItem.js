import React from 'react';
import { navigate } from 'gatsby';

import { useShoppingCartContext } from '../../context/ShoppingCartContextProvider';
import AdjustItem from '../AdjustItem';
import CurrencyFormatter from '../CurrencyFormatter';
import RemoveItem from '../RemoveItem';

import * as styles from './CartItem.module.css';


const CartItem = (props) => {
  const { cartItemId } = props;
  const { data: { cart = [] }, upsertCartItemById, removeCartItemByid } = useShoppingCartContext();
  const existingCartItem = cartItemId && cart.find(item => item.cartItemId === cartItemId);

  const fullEditItem = () => {
    navigate(`/product/${existingCartItem.productCode}`, { state: { cartItemId }});
  }

  const onUpdateQuantity = (quantity) => {
    upsertCartItemById({
      ...existingCartItem,
      quantity: Math.max(quantity, 1)
    });
  }
  
  return (
    <div className={styles.root}>
      <div className={styles.imageContainer} role={'presentation'} onClick={fullEditItem}>
        <img src={existingCartItem.image} alt={existingCartItem.name}></img>
      </div>
      <div className={styles.itemContainer}>
        <span className={styles.name}>{existingCartItem.name}</span>
        <div className={styles.metaContainer}>
          <span>顏色: {existingCartItem.color || 'N/A'}</span>
          <span>尺寸: {existingCartItem.size || 'N/A'}</span>
        </div>
        <div className={styles.editContainer} role={'presentation'} onClick={fullEditItem}>
          <span>更改</span>
        </div>
      </div>
      <div className={styles.adjustItemContainer}>
        <AdjustItem value={existingCartItem.quantity} setValue={onUpdateQuantity} />
      </div>
      <div className={styles.priceContainer}>
        <CurrencyFormatter amount={existingCartItem.price} appendZero />
      </div>
      <div className={styles.removeContainer}>
        <RemoveItem onClick={() => removeCartItemByid(existingCartItem.cartItemId)} />
      </div>
    </div>
  );
};

export default CartItem;
