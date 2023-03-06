import React from 'react';
import * as styles from './404.module.css';
import Container from '../components/Container';
import Layout from '../components/Layout';

const NotFoundPage = () => {
  return (
    <Layout disablePaddingBottom>
      <Container size={'medium'}>
        <div className={styles.root}>
          <h1>404 Error</h1>
          <h2>Page not found</h2>
          <p>
            Uh oh, looks like the page you are looking for has moved or no
            longer exists.
          </p>
        </div>
      </Container>
    </Layout>
  );
};

export default NotFoundPage;
