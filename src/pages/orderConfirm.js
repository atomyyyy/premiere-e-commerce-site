import React from 'react';
import * as styles from './orderConfirm.module.css';

import ActionCard from '../components/ActionCard';
import Container from '../components/Container';
import Layout from '../components/Layout/Layout';
import Icon from '../components/Icons/Icon';

const OrderConfirmPage = ({ location }) => {
  const { state = {} } = location || {};
  const { orderId = '', person = {}, cart = [] } = state || {};
  const { address = '' } = person;
  const onWhatsappIconClick = () => {
    const baseUrl = 'https://api.whatsapp.com/send';
    const searchParams = new URLSearchParams({
      phone: 85262666176,
      text: `我的訂單號碼: ${orderId}\n\n收件地址:\n${address}\n\n訂單內容:\n${cart.map(item => `${item.name} x ${item.quantity}`).join('\n')}\n\n以下是我的付款收據:`.replace('/\n/g', '%0a')
    });
    window.open(`${baseUrl}?${searchParams.toString()}`);
  };
  return (
    <Layout disablePaddingBottom>
      <Container size={'medium'}>
        <div className={styles.root}>
          <h1>Thank You!</h1>
          <p>
            We are now processing your order. If you have any concerns feel free
            to email us at customerservice@example.com.
          </p>
          <p>
            Your order Id: {orderId}
          </p>
          <p>
            Please do something to pay money
          </p>
          <div className={styles.whatsappIcon} onClick={onWhatsappIconClick}>
            <Icon symbol={'whatsapp'}/>
          </div>
          <div className={styles.actionContainer}>

            <ActionCard
              title={'Shop'}
              icon={'bag'}
              subtitle={'Continue Shopping'}
              link={'/'}
            />

            <ActionCard
              title={'FAQs'}
              icon={'question'}
              subtitle={'Check out FAQs page'}
              link={'/faq'}
            />

            <ActionCard
              title={'Contact Us'}
              icon={'phone'}
              subtitle={'Reach out to us'}
              link={'/support#contact'}
            />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default OrderConfirmPage;
