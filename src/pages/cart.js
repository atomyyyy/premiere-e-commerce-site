import { Link } from 'gatsby';
import React from 'react';

import Brand from '../components/Brand';
import CartItem from '../components/CartItem';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Icon from '../components/Icons/Icon';
import OrderSummary from '../components/OrderSummary';

import * as styles from './cart.module.css';

import { useShoppingCartContext } from '../context/ShoppingCartContextProvider';

const CartPage = (props) => {
  const { data = {}, updateState } = useShoppingCartContext()
  const { cart = [] } = data

  return (
    <div>
      <div className={styles.contentContainer}>
        <Container size={'large'} spacing={'min'}>
          <div className={styles.headerContainer}>
            <div className={styles.shoppingContainer}>
              <Link className={styles.shopLink} to={'/'}>
                <Icon symbol={'arrow'}></Icon>
                <span className={styles.continueShopping}>
                  Continue Shopping
                </span>
              </Link>
            </div>
            <Brand />
          </div>
          <div className={styles.summaryContainer}>
            <h3>My Cart</h3>
            <div className={styles.cartContainer}>
              <div className={styles.cartItemsContainer}>
                {(cart||[]).map((item, idx) => (
                  <CartItem {...item} idx={idx} onItemUpdate={(newItem) => {
                    const originalCart = data.cart;
                    originalCart[idx] = newItem;
                    updateState({
                      ...data,
                      cart: originalCart
                    })
                  }} onItemDelete={() => {
                    updateState({
                      ...data,
                      cart: data.cart.filter((item, index) => index !== idx)
                    })
                  }} />
                ))}
              </div>
              <OrderSummary />
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
