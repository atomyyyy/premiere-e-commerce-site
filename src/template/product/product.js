import React from 'react';
import { navigate } from 'gatsby';
import { useForm } from 'react-hook-form';

import { useShoppingCartContext } from '../../context/ShoppingCartContextProvider';
import Accordion from '../../components/Accordion';
import AdjustItem from '../../components/AdjustItem';
import Button from '../../components/Button';
import Breadcrumbs from '../../components/Breadcrumbs';
import Container from '../../components/Container';
import CurrencyFormatter from '../../components/CurrencyFormatter';
import Gallery from '../../components/Gallery';
import SizeList from '../../components/SizeList';
import ColorList from '../../components/ColorList';
import Layout from '../../components/Layout/Layout';
import { uniqueId } from '../../helpers/general';import Seo from '../../components/Seo'

import * as styles from './product.module.css';

const ProductPage = ({ pageContext, location }) => {
  const { state = {} } = location || {};
  const { cartItemId = null } = state;

  const { data: { cart = [] } = {}, upsertCartItemById } = useShoppingCartContext();
  const existingCartItem = cartItemId && cart.find(item => item.cartItemId === cartItemId);

  const {
    productCode,
    name,
    price,
    colorOptions,
    sizeOptions,
    gallery,
    description,
    image,
    category
  } = pageContext;

  const {
    register,
    handleSubmit,
    setValue,
    watch
  } = useForm({
    defaultValues: {
      cartItemId: cartItemId || uniqueId(),
      name,
      productCode,
      price,
      image,
      size: cartItemId ? existingCartItem.size : null,
      color: cartItemId ? existingCartItem.color : colorOptions ? colorOptions[0].title : null,
      quantity: cartItemId ? existingCartItem.quantity : 1
    }
  });

  const onSubmit = (cartItem) => {
    upsertCartItemById(cartItem);
    navigate('/cart');
  }

  return (
    <Seo title={`Premiere | ${name}`}>
      <Layout>
        <div className={styles.root}>
          <Container size={'large'} spacing={'min'}>
            <Breadcrumbs
              crumbs={[
                { link: '/', label: category },
                { label: name },
              ]}
            />
            <div className={styles.content}>
              <div className={styles.gallery}>
                <Gallery images={gallery} />
              </div>
              <div className={styles.details}>
                <h1>{name}</h1>
                <div className={styles.priceContainer}>
                  <CurrencyFormatter appendZero amount={price} />
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={styles.quantityContainer}>
                    <span>數量</span>
                    <AdjustItem
                      {...register('quantity')}
                      ref={null}
                      value={watch('quantity')}
                      setValue={(val) => setValue('quantity', val)}
                    />
                  </div>

                  {colorOptions?.length && (
                    <div className={styles.sizeContainer}>
                      <ColorList
                        {...register('color')}
                        ref={null}
                        options={colorOptions}
                        value={watch('color')}
                        setActiveColor={(val) => setValue('color', val)}
                      />
                    </div>
                  )}

                  {sizeOptions?.length && (
                    <div className={styles.sizeContainer}>
                      <SizeList
                        {...register('size')}
                        ref={null}
                        setActive={(val) => setValue('size', val)}
                        options={sizeOptions}
                        value={watch('size')}
                      />
                    </div>
                  )}

                  <div className={styles.actionContainer}>
                    <div className={styles.addToButtonContainer}>
                      <Button fullWidth level={'primary'} type='submit'>
                        加入購物車
                      </Button>
                    </div>
                  </div>
                </form>

                <div className={styles.description}> 
                  <p>{description}</p>
                  <span>Product code: {productCode}</span>
                </div>

                <div className={styles.informationContainer}>
                  <Accordion
                    type={'plus'}
                    customStyle={styles}
                    title={'composition & care'}
                  >
                    <p className={styles.information}>
                      {description}
                    </p>
                  </Accordion>
                  <Accordion
                    type={'plus'}
                    customStyle={styles}
                    title={'delivery & returns'}
                  >
                    <p className={styles.information}>
                      {description}
                    </p>
                  </Accordion>
                  <Accordion type={'plus'} customStyle={styles} title={'help'}>
                    <p className={styles.information}>
                      {description}
                    </p>
                  </Accordion>
                </div>
              </div>
            </div>
          </Container>

        </div>
      </Layout>
    </Seo>
  );
};

export default ProductPage;
