import React, { useState } from 'react';
import { Link, navigate } from 'gatsby';
import { useForm } from 'react-hook-form';

import Button from '../Button';
import FormInputField from '../FormInputField/FormInputField';
import CurrencyFormatter from '../CurrencyFormatter';
import { useShoppingCartContext } from '../../context/ShoppingCartContextProvider';

import * as styles from './OrderSummary.module.css';

const OrderSummary = () => {
  const [loading, setLoading] = useState(false);
  const { data = {}, resetCart } = useShoppingCartContext();
  const { cart = [] } = data;

  const subTotalCost = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const shippingCost = 0;
  const totalCost = subTotalCost + shippingCost;

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch
  } = useForm({
    defaultValues: {
      email: '',
      name: '',
      address: '',
    }
  });

  const onOrderConfirm = (data, e) => {
    setLoading(true);

    const subTotalCost = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const shippingCost = 0;
    const totalCost = subTotalCost + shippingCost;

    const formValues = getValues();
    fetch(`${process.env.GATSBY_API_BASE_PATH}/checkout`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues)
    }).then(res => res.json()).then((res) => {
      resetCart();
      const formData = new FormData();
      formData.append('form-name', 'order-submission-form');
      formData.append('orderId', res.orderId);
      formData.append('name', formValues.name);
      formData.append('email', formValues.email);
      formData.append('address', formValues.address);
      formData.append('totalCost', totalCost);

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      }).then(() => {
        navigate('/orderConfirm', { state: res });
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    }).catch(() => {
      setLoading(false);
    });
  }

  return (
    <div className={styles.root}>
      <form
        onSubmit={handleSubmit(onOrderConfirm)}
        name='order-submission-form'
        id='order-submission-form'
        method='POST'
        data-netlify='true'
        data-netlify-honeypot='bot-field'
        action='/'
      >
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
              {...register('name')}
              value={watch('name')}
              handleChange={(_, name) => setValue('name', name)}
              id={'name'}
            />
            <span>Email</span>
            <FormInputField
              {...register('email')}
              value={watch('email')}
              handleChange={(_, email) => setValue('email', email)}
              id={'email'}
            />
            <span>Address</span>
            <FormInputField
              {...register('address')}
              value={watch('address')}
              handleChange={(_, address) => setValue('address', address)}
              id={'address'}
            />
            <FormInputField id={'orderId'} hidden={true} />
            <FormInputField id={'totalCost'} hidden={true} />
          </div>
          <div className={styles.totalContainer}>
            <span>Total: </span>
            <span>
              <CurrencyFormatter amount={totalCost} appendZero />
            </span>
          </div>
        </div>
        <div className={styles.actionContainer}>
          <Button className='spinner' disabled={loading} fullWidth level={'primary'}>
            {!loading && <>Checkkout</>}
            {loading && (
              <svg
                className='spinner'
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.38798 12.616C3.36313 12.2306 2.46328 11.5721 1.78592 10.7118C1.10856 9.85153 0.679515 8.82231 0.545268 7.73564C0.411022 6.64897 0.576691 5.54628 1.02433 4.54704C1.47197 3.54779 2.1845 2.69009 3.08475 2.06684C3.98499 1.4436 5.03862 1.07858 6.13148 1.01133C7.22435 0.944078 8.31478 1.17716 9.28464 1.68533C10.2545 2.19349 11.0668 2.95736 11.6336 3.89419C12.2004 4.83101 12.5 5.90507 12.5 7"
                  stroke="white"
                />
              </svg>
            )}
          </Button>
          <div className={styles.linkContainer}> <Link to={'/'}>CONTINUE SHOPPING</Link> </div>
        </div>
      </form>
    </div>
  );
};

export default OrderSummary;
