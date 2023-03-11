import React from 'react';

import BoxOption from '../BoxOption';
import * as styles from './SizeList.module.css';

const SizeList = (props) => {
  const { options, setActive, value } = props;
  return (
    <div className={styles.root}>
      <div className={styles.sizeLabelContainer}>
        <span className={styles.label}>尺寸</span>
        <span className={`${styles.label} ${styles.guide}`}>尺寸參考</span>
      </div>
      <div className={styles.sizeSelection}>
        {options?.map((sizeOption, index) => {
          return (
            <BoxOption
              key={index}
              data={sizeOption}
              setActive={setActive}
              isActive={value === sizeOption}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SizeList;
