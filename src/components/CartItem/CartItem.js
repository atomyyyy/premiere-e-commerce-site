import React, { useState } from 'react';

import AdjustItem from '../AdjustItem';
import CurrencyFormatter from '../CurrencyFormatter';
import Drawer from '../Drawer';
import RemoveItem from '../RemoveItem';
import QuickView from '../QuickView';

import * as styles from './CartItem.module.css';
import { navigate } from 'gatsby';

const CartItem = (props) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const { 
    idx,
    productCode,
    name,
    price,
    color,
    size,
    image,
    quantity,
    onItemUpdate = () => {},
    onItemDelete = () => {}
  } = props;

  return (
    <div className={styles.root}>
      <div
        className={styles.imageContainer}
        role={'presentation'}
        onClick={() => navigate(`/product/${productCode}`)}
      >
        <img src={image} alt={name}></img>
      </div>
      <div className={styles.itemContainer}>
        <span className={styles.name}>{name}</span>
        <div className={styles.metaContainer}>
          <span>Color: {color}</span>
          <span>Size: {size}</span>
        </div>
        {/* <div
          className={styles.editContainer}
          role={'presentation'}
          onClick={() => setShowQuickView(true)}
        >
          <span>Edit</span>
        </div> */}
      </div>
      <div className={styles.adjustItemContainer}>
        <AdjustItem originalQuantity={quantity} onQuantityUpdate={(qty) => onItemUpdate({
          productCode,
          name,
          price,
          color,
          size,
          image,
          quantity: qty
        })} />
      </div>
      <div className={styles.priceContainer}>
        <CurrencyFormatter amount={price} appendZero />
      </div>
      <div className={styles.removeContainer}>
        <RemoveItem onClick={onItemDelete} />
      </div>
      <Drawer visible={showQuickView} close={() => setShowQuickView(false)}>
        <QuickView close={() => setShowQuickView(false)} />
      </Drawer>
    </div>
  );
};

export default CartItem;
