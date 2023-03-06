import React, { useState } from 'react';
import { Link, navigate } from 'gatsby';

import Button from '../Button';
import FormInputField from '../FormInputField/FormInputField';
import CurrencyFormatter from '../CurrencyFormatter';
import { useShoppingCartContext } from '../../context/ShoppingCartContextProvider';

import * as styles from './OrderSummary.module.css';

const OrderSummary = (props) => {
  const { data = {} } = useShoppingCartContext();
  const { cart = [] } = data;
  const [coupon, setCoupon] = useState('');

  const subTotalCost = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const shippingCost = 0;
  const totalCost = subTotalCost + shippingCost;

  return (
    <div className={styles.root}>
      <div className={styles.orderSummary}>
        <span className={styles.title}>order summary</span>
        <div className={styles.calculationContainer}>
          <div className={styles.labelContainer}>
            <span>Subtotal</span>
            <span>
              <CurrencyFormatter amount={subTotalCost} appendZero />
            </span>
          </div>
          <div className={styles.labelContainer}>
            <span>Shipping</span>
            <span>{shippingCost}</span>
          </div>
        </div>
        <div className={styles.couponContainer}>
          <span>Coupon Code</span>
          <FormInputField
            value={coupon}
            handleChange={(_, coupon) => setCoupon(coupon)}
            id={'couponInput'}
            icon={'arrow'}
          />
        </div>
        <div className={styles.totalContainer}>
          <span>Total: </span>
          <span>
            <CurrencyFormatter amount={totalCost} appendZero />
          </span>
        </div>
      </div>
      <div className={styles.actionContainer}>
        <Button
          onClick={() => navigate('/orderConfirm')}
          fullWidth
          level={'primary'}
        >
          checkout
        </Button>
        <div className={styles.linkContainer}>
          <Link to={'/'}>CONTINUE SHOPPING</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
