import { Link } from 'gatsby';
import React from 'react';

import { useShoppingCartContext } from '../context/ShoppingCartContextProvider';

import Brand from '../components/Brand';
import CartItem from '../components/CartItem';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Icon from '../components/Icons/Icon';
import OrderSummary from '../components/OrderSummary';
import Seo from '../components/Seo';

import * as styles from './cart.module.css';

const CartPage = () => {
  const { data: { cart = [] } = {} } = useShoppingCartContext();

  return (
    <div>
      <Seo title={`Premiere | 我的購物車`} />
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
            <h3>我的購物車</h3>
            <div className={styles.cartContainer}>
              <div className={styles.cartItemsContainer}>
                {cart.map(item => (
                  <CartItem
                    key={item.cartItemId}
                    cartItemId={item.cartItemId}
                  />
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
