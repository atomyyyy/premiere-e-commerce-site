import React from 'react';

import ColorOption from '../ColorOption';
import * as styles from './ColorList.module.css';

const ColorList = (props) => {
  const { options = [], value, setActiveColor } = props;

  return (
    <div className={styles.root}>
      <span className={styles.label}>已選顏色: {value}</span>
      <div className={styles.swatchSelection}>
        {options?.map(({title, color}, index) => {
          return (
            <ColorOption
              key={index}
              data={title}
              colorCode={color}
              setActiveColor={setActiveColor}
              isActive={title === value}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ColorList;
