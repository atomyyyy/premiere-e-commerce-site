import { Link, navigate } from 'gatsby';
import React from 'react';

import Button from '../Button';
import CurrencyFormatter from '../CurrencyFormatter';
import MiniCartItem from '../MiniCartItem';

import * as styles from './MiniCart.module.css';

import { useShoppingCartContext } from '../../context/ShoppingCartContextProvider';

const MiniCart = (props) => {
  const { data = {}, updateState } = useShoppingCartContext()
  const { cart = [] } = data

  return (
    <div className={styles.root}>
      <div className={styles.titleContainer}>
        <h4>My Cart</h4>
      </div>
      <div className={styles.cartItemsContainer}>
        {(cart||[]).map(item => (
          <MiniCartItem {...item} />
        ))}
      </div>
      <div className={styles.summaryContainer}>
        <div className={styles.summaryContent}>
          <div className={styles.totalContainer}>
            <span>Total (HKD)</span>
            <span>
              <CurrencyFormatter amount={220} appendZero />
            </span>
          </div>
          <span className={styles.taxNotes}>
            Taxes and shipping will be calculated at checkout
          </span>
          <Button onClick={() => navigate('/cart')} level={'primary'} fullWidth>
            checkout
          </Button>
          <div className={styles.linkContainer}>
            <Link to={'/'}>continue shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCart;
