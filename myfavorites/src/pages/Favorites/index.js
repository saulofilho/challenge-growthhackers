import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { store } from '../../store';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const { Content } = Layout;

const styleLayout = {
  background: 'white',
};

export default function Favorites({ isPrivate }) {
  const { signed } = store.getState().auth;

  if (window.location.pathname === '/favorites' && isPrivate && !signed) {
    window.location.replace('/');
  }

  return (
    <Layout style={styleLayout}>
      <Header />
      <div className="style-wrapper">
        <Content>
          <h1>content favorites</h1>
        </Content>
      </div>
      <Footer />
    </Layout>
  );
}

Favorites.propTypes = {
  isPrivate: PropTypes.bool,
};

Favorites.defaultProps = {
  isPrivate: true,
};
