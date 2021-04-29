import React from 'react';
import { Layout } from 'antd';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const { Content } = Layout;

const styleLayout = {
  background: 'white',
};

export default function Space() {
  return (
    <Layout style={styleLayout}>
      <Header />
      <div className="style-wrapper">
        <Content>
          <h1>content Space</h1>
        </Content>
      </div>
      <Footer />
    </Layout>
  );
}
