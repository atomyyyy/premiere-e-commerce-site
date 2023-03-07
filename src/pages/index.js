import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Container from '../components/Container';
import Hero from '../components/Hero';
import Layout from '../components/Layout/Layout';
import ProductCardGrid from '../components/ProductCardGrid';
import Title from '../components/Title';

import * as styles from './index.module.css';

function useHashFragment(offset = 0, trigger = true) {
  React.useEffect(() => {
    const scrollToHashElement = () => {
      const { hash } = window.location;
      const elementToScroll = document.getElementById(hash?.replace("#", ""));

      if (!elementToScroll) return;

      window.scrollTo({
        top: elementToScroll.offsetTop - offset,
        behavior: "smooth"
      });
    };

    if (!trigger) return;

    scrollToHashElement();
    window.addEventListener("hashchange", scrollToHashElement);
    return window.removeEventListener("hashchange", scrollToHashElement);
  }, [trigger]);
}

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
          name
          alt
          price
          colorOptions {
            color
            title
          }
          sizeOptions
          tags
          gallery {
            image
            alt
          }
          description
          image
          category
        }
      }
    }
  }`).allMongodbECommerceProduct.edges.map(item => item.node);

  useHashFragment()
  return (
    <Layout disablePaddingBottom>
      {/* Hero Container */}
      <Hero
        maxWidth={'100px'}
        image={'/banner1.png'}
        title={'Make something simple'}
      />

      <section id='clothings' name='clothings'>
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
      </section>

      <section id='accessories' name='accessories'>
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
      </section>
    </Layout>
  );
};

export default IndexPage;
