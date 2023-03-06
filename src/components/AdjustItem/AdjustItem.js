import React, { useState } from 'react';

import Icon from '../Icons/Icon';
import * as styles from './AdjustItem.module.css';

const AdjustItem = (props) => {
  const {
    isTransparent,
    originalQuantity = 1,
    onQuantityUpdate = (num) => {}
  } = props;
  console.log(props);
  const [qty, setQty] = useState(originalQuantity);

  const handleOnChange = (e) => {
    const num = parseInt(e.target.value);
    setQty(num);
    onQuantityUpdate(num);
  };

  return (
    <div
      className={`${styles.root} ${
        isTransparent === true ? styles.transparent : ''
      }`}
    >
      <div
        className={styles.iconContainer}
        role={'presentation'}
        onClick={() => {
          if (qty <= 1) return;
          setQty(qty - 1);
          onQuantityUpdate(qty-1);
        }}
      >
        <Icon symbol={'minus'}></Icon>
      </div>
      <div className={styles.inputContainer}>
        <input
          className={`${isTransparent === true ? styles.transparentInput : ''}`}
          onChange={(e) => handleOnChange(e)}
          type={'number'}
          value={qty}
        ></input>
      </div>
      <div
        role={'presentation'}
        onClick={() => {
          setQty(qty + 1);
          onQuantityUpdate(qty+1);
        }}
        className={styles.iconContainer}
      >
        <Icon symbol={'plus'}></Icon>
      </div>
    </div>
  );
};

export default AdjustItem;
