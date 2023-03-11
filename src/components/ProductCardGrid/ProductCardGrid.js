import React, { useState } from 'react';
import * as styles from './ProductCardGrid.module.css';

import Drawer from '../Drawer';
import ProductCard from '../ProductCard';
import QuickView from '../QuickView';
import Slider from '../Slider';

import { useShoppingCartContext } from '../../context/ShoppingCartContextProvider';
import { navigate } from 'gatsby';

const ProductCardGrid = (props) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const { height, columns = 3, data, spacing, showSlider = false } = props;
  const columnCount = { gridTemplateColumns: `repeat(${columns}, 1fr)` };

  const { setActiveProduct } = useShoppingCartContext();
  const onDrawerClose = () => {
    setShowQuickView(false);
    setActiveProduct(null);
  }

  const renderCards = () => {
    return data.map((product, index) => {
      return (
        <ProductCard
          key={index}
          height={height}
          path={product.productCode}
          price={product.price}
          imageAlt={product.alt}
          name={product.name}
          image={product.image}
          meta={product.meta}
          originalPrice={product.originalPrice}
          link={product.link}
          showQuickView={() => {
            if (window.innerWidth < 480) {
              navigate(`/product/${product.productCode}`);
            } else {
              setActiveProduct(product);
              setShowQuickView(true);
            }
          }}
        />
      );
    });
  };

  return (
    <div className={styles.root} style={columnCount}>
      <div
        className={`${styles.cardGrid} ${
          showSlider === false ? styles.show : ''
        }`}
        style={columnCount}
      >
        {data && renderCards()}
      </div>

      {showSlider === true && (
        <div className={styles.mobileSlider}>
          <Slider infinite={false} spacing={spacing}>{data && renderCards()}</Slider>
        </div>
      )}

      <Drawer visible={showQuickView} close={onDrawerClose}>
        <QuickView close={onDrawerClose} />
      </Drawer>
    </div>
  );
};

export default ProductCardGrid;
