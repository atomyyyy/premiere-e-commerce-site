import React, { useState, useContext, useEffect } from 'react';

import Button from '../Button';
import CurrencyFormatter from '../CurrencyFormatter';
import SizeList from '../SizeList';
import SwatchList from '../SwatchList';
import { uniqueId } from '../../helpers/general';

import AddItemNotificationContext from '../../context/AddItemNotificationProvider';
import { useShoppingCartContext } from '../../context/ShoppingCartContextProvider';

import * as styles from './QuickView.module.css';

const QuickView = (props) => {
  const { close, buttonTitle = 'Add to Cart' } = props;

  const { data = {}, updateState } = useShoppingCartContext();
  const { cart = [], activeProduct = {} } = data;

  const ctxAddItemNotification = useContext(AddItemNotificationContext);
  const showNotification = ctxAddItemNotification.showNotification;

  const [activeColor, setActiveColor] = useState(
    activeProduct?.colorOptions?.length ? activeProduct?.colorOptions[0] : null 
  );
  const [activeSize, setActiveSize] = useState(
    activeProduct?.sizeOptions?.length ? activeProduct?.sizeOptions[0] : null
  );

  useEffect(() => {
    setActiveColor(activeProduct?.colorOptions?.length ? activeProduct?.colorOptions[0] : null)
    setActiveSize( activeProduct?.sizeOptions?.length ? activeProduct?.sizeOptions[0] : null)
  }, [activeProduct])

  const handleAddToBag = () => {
    close();
    showNotification();
    updateState({
      ...data,
      cart: [...cart, {
        cartItemId: uniqueId(),
        productCode: activeProduct?.productCode,
        name: activeProduct?.name,
        price: activeProduct?.price,
        color: activeColor?.title,
        size: activeSize,
        description: activeProduct?.description,
        image: activeProduct?.image,
        category: activeProduct?.category,
        quantity: 1
      }]
    })
  };

  if (activeProduct) {
    return (
      <div className={styles.root}>
        <div className={styles.titleContainer}>
          <h4>Select Options</h4>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.productContainer}>
            <span className={styles.productName}>{activeProduct?.name}</span>
            <div className={styles.price}>
              <CurrencyFormatter amount={activeProduct?.price}></CurrencyFormatter>
            </div>
            <div className={styles.productImageContainer}>
              <img alt={activeProduct?.alt} src={activeProduct?.image}></img>
            </div>
          </div>
  
          {activeColor && activeProduct?.colorOptions?.length && (
            <div className={styles.sectionContainer}>
              <SwatchList
                swatchList={activeProduct?.colorOptions || []}
                activeSwatch={activeColor}
                setActiveSwatch={setActiveColor}
              />
            </div>
          )}
  
          {activeSize && activeProduct?.sizeOptions?.length && (
            <div className={styles.sectionContainer}>
              <SizeList
                sizeList={activeProduct?.sizeOptions}
                activeSize={activeSize}
                setActiveSize={setActiveSize}
              />
            </div>
          )}
          
          <Button onClick={() => handleAddToBag()} fullWidth level={'primary'}>
            {buttonTitle}
          </Button>
        </div>
      </div>
    );
  }

  return <div></div>

};

export default QuickView;
