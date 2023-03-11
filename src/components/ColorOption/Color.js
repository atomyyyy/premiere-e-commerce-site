import React from 'react';
import * as styles from './Color.module.css';

const Color = (props) => {
  const { data, colorCode, setActiveColor, isActive } = props;

  return (
    <button
      className={`${styles.root} ${isActive === true ? styles.isActive : ''}`}
      onClick={() => setActiveColor(data)}
      type='button'
    >
      <div
        style={{ backgroundColor: colorCode }}
        className={styles.circle}
      ></div>
    </button>
  );
};

export default Color;
