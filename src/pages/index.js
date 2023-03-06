import * as React from 'react';

import Container from '../components/Container';
import Hero from '../components/Hero';
import Layout from '../components/Layout/Layout';
import ProductCardGrid from '../components/ProductCardGrid';
import Title from '../components/Title';

import { generateMockProductData } from '../helpers/mock';

import * as styles from './index.module.css';

const IndexPage = (prop) => {
  const newArrivals = generateMockProductData(3, 'shirt');

  return (
    <Layout disablePaddingBottom>
      {/* Hero Container */}
      <Hero
        maxWidth={'100px'}
        image={'/banner1.png'}
        title={'Essentials for a cold winter'}
      />

      {/* Clothing */}
      <div key='clothing' className={styles.newArrivalsContainer}>
        <Container>
          <Title name={'Clothing'} />
          <ProductCardGrid
            spacing={true}
            showSlider
            height={480}
            columns={4}
            data={newArrivals}
          />
        </Container>
      </div>

      {/* Accessories */}
      <div key='access' className={styles.newArrivalsContainer}>
        <Container>
          <Title name={'Accessories'} />
          <ProductCardGrid
            spacing={true}
            showSlider
            height={480}
            columns={3}
            data={newArrivals}
          />
        </Container>
      </div>
    </Layout>
  );
};

export default IndexPage;
