import React from 'react';

import Icon from '../Icons/Icon';
import * as styles from './AdjustItem.module.css';

const AdjustItem = (props) => {
  const { isTransparent, value, setValue } = props;
  return (
    <div
      className={`${styles.root} ${
        isTransparent === true ? styles.transparent : ''
      }`}
    >
      <div className={styles.iconContainer} role={'presentation'} onClick={() => setValue(Math.max(value - 1, 1))}>
        <Icon symbol={'minus'}></Icon>
      </div>
      <div className={styles.inputContainer}>
        <input
          className={`${isTransparent === true ? styles.transparentInput : ''}`}
          onChange={(e) => setValue(parseInt(e.target.value))}
          type={'number'}
          value={value}
        ></input>
      </div>
      <div className={styles.iconContainer} role={'presentation'} onClick={() => setValue(value+1)}>
        <Icon symbol={'plus'}></Icon>
      </div>
    </div>
  );
};

export default AdjustItem;
