import React, { useState } from 'react';
import * as styles from './product.module.css';

import Accordion from '../../components/Accordion';
import AdjustItem from '../../components/AdjustItem';
import Button from '../../components/Button';
import Breadcrumbs from '../../components/Breadcrumbs';
import Container from '../../components/Container';
import CurrencyFormatter from '../../components/CurrencyFormatter';
import Gallery from '../../components/Gallery';
import SizeList from '../../components/SizeList';
import ColorList from '../../components/SwatchList';
import Layout from '../../components/Layout/Layout';

import { useShoppingCartContext } from '../../context/ShoppingCartContextProvider';
import { navigate } from 'gatsby';

const ProductPage = ({ pageContext }) => {
  const { data = {}, updateState } = useShoppingCartContext();

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

  const [quantity, setquantity] = useState(0);
  const [activeColor, setActiveColor] = useState(colorOptions?.length ? colorOptions[0] : null);
  const [activeSize, setActiveSize] = useState(sizeOptions?.length ? sizeOptions[0] : null);

  return (
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

              {colorOptions?.length && (
                <div>
                  <ColorList
                    swatchList={colorOptions}
                    activeSwatch={activeColor}
                    setActiveSwatch={setActiveColor}
                  />
                </div>
              )}
              
              {sizeOptions?.length && (
                <div className={styles.sizeContainer}>
                  <SizeList
                    sizeList={sizeOptions}
                    activeSize={activeSize}
                    setActiveSize={setActiveSize}
                  />
                </div>
              )}

              <div className={styles.quantityContainer}>
                <span>Quantity</span>
                <AdjustItem originalQuantity={quantity} onQuantityUpdate={setquantity} />
              </div>

              <div className={styles.actionContainer}>
                <div className={styles.addToButtonContainer}>
                  <Button
                    onClick={() => {
                      updateState({
                        ...data,
                        cart: [...data.cart, {
                          productCode,
                          name,
                          price,
                          color: activeColor?.title,
                          size: activeSize,
                          description,
                          image,
                          category,
                          quantity
                        }]
                      });
                      navigate('/cart');
                    }}
                    fullWidth
                    level={'primary'}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>

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
  );
};

export default ProductPage;
