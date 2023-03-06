import React, { useRef } from 'react';

import Container from '../components/Container';
import Layout from '../components/Layout/Layout';

import * as styles from './about.module.css';
const AboutPage = (props) => {
  let historyRef = useRef();
  let valuesRef = useRef();
  let sustainabilityRef = useRef();

  const handleScroll = (elementReference) => {
    if (elementReference) {
      window.scrollTo({
        behavior: 'smooth',
        top: elementReference.current.offsetTop - 280,
      });
    }
  };

  return (
    <Layout disablePaddingBottom>
      <div className={styles.root}>
        <Container size={'large'} spacing={'min'}>
          <div className={styles.detailContainer}>
            <p>
              Founded in 1860, Sydney is an innovative British brand with a
              contemporary edge. We make timeless everyday luxury clothing.
            </p>
            <br />
            <br />
            <p>
              We created some of the world's first T-shirts and spent decades
              perfecting the feel of the cotton. Today we are the only brand
              that makes T-shirts in its own factory in the UK. And we do this
              in the same factory we have occupied since 1937.
            </p>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default AboutPage;
