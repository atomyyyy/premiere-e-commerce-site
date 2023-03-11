import React from 'react';

import ColorOption from '../ColorOption';
import * as styles from './ColorList.module.css';

const ColorList = (props) => {
  const { options = [], value, setActiveColor } = props;
  const activeColor = options.find(({ color }) => color === value);
  const colorCodeList = options.map(option => option.color);

  return (
    <div className={styles.root}>
      <span className={styles.label}>已選顏色: {activeColor?.title}</span>
      <div className={styles.swatchSelection}>
        {colorCodeList?.map((colorCode, index) => {
          return (
            <ColorOption
              key={index}
              data={colorCode}
              setActiveColor={setActiveColor}
              isActive={value === activeColor?.color}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ColorList;
