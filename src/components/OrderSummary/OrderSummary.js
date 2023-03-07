import React, { useState } from 'react';
import { Link, navigate } from 'gatsby';

import Button from '../Button';
import FormInputField from '../FormInputField/FormInputField';
import CurrencyFormatter from '../CurrencyFormatter';
import { useShoppingCartContext } from '../../context/ShoppingCartContextProvider';

import * as styles from './OrderSummary.module.css';

const OrderSummary = (props) => {
  const { data = {}, updateState } = useShoppingCartContext();
  const { cart = [] } = data;
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');

  const subTotalCost = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const shippingCost = 0;
  const totalCost = subTotalCost + shippingCost;

  const onOrderConfirm = (callback) => {
    fetch(`${process.env.GATSBY_API_BASE_PATH}/checkout`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        person: {
          name,
          email,
          address
        },
        cart,
        cost: {
          subTotalCost,
          shippingCost,
          totalCost
        }
      })
    }).then(res => res.json()).then(res => res.statusText()).then((res) => {
      updateState({ ...data, cart: [] })
      callback({ state: res })
    });
  }

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
          <span>Name</span>
          <FormInputField
            value={name}
            handleChange={(_, name) => setName(name)}
            id={'nameInput'}
          />
          <span>Email</span>
          <FormInputField
            value={email}
            handleChange={(_, email) => setEmail(email)}
            id={'emailInput'}
          />
          <span>Address</span>
          <FormInputField
            value={address}
            handleChange={(_, address) => setAddress(address)}
            id={'addressInput'}
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
          onClick={() => onOrderConfirm((orderDetail) => navigate('/orderConfirm', orderDetail))}
          fullWidth
          level={'primary'}
          form='netlify-submission-log'
        >
          checkout
        </Button>
        <div className={styles.linkContainer}>
          <Link to={'/'}>CONTINUE SHOPPING</Link>
        </div>
      </div>
      <form name='netlify-submission-log' data-netlify='true'>
        <input type="hidden"  name="action" value="submission" />
      </form>
    </div>
  );
};

export default OrderSummary;
