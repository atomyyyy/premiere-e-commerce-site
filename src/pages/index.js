import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Container from '../components/Container';
import Hero from '../components/Hero';
import Layout from '../components/Layout/Layout';
import ProductCardGrid from '../components/ProductCardGrid';
import Title from '../components/Title';

import { generateMockProductData } from '../helpers/mock';

import * as styles from './index.module.css';

const IndexPage = (prop) => {
  const products = useStaticQuery(graphql`query ClothingProductQuery {
    allMongodbECommerceProduct(filter: {
			isActive: {
				eq: true
      }
    }) {
    edges {
        node {
          productCode
          category
          price
          name
          image
        }
      }
    }
  }`).allMongodbECommerceProduct.edges.map(item => item.node);
  return (
    <Layout disablePaddingBottom>
      {/* Hero Container */}
      <Hero
        maxWidth={'100px'}
        image={'/banner1.png'}
        title={'Essentials for a cold winter'}
      />

      {/* Clothings */}
      <div key='Clothings' className={styles.newArrivalsContainer}>
        <Container>
          <Title name={'Clothings'} />
          <ProductCardGrid
            spacing={true}
            showSlider
            height={350}
            columns={4}
            data={products.filter(({ category }) => category === 'clothings')}
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
            height={350}
            columns={4}
            data={products.filter(({ category }) => category === 'accessories')}
          />
        </Container>
      </div>
    </Layout>
  );
};

export default IndexPage;
