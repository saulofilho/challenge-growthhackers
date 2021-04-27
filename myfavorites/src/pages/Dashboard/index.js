import { Row, Col, Layout } from 'antd';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const { Content } = Layout;

const styleLayout = {
  background: '#e6fffb',
};
const styleContent = {};
const styleWrapper = {
  maxWidth: '900px',
  width: '100%',
  margin: '0 auto',
  height: '100%',
};

// eslint-disable-next-line react/prop-types
export default function Dashboard({ isPrivate, ...rest }) {
  console.log('isPrivate', isPrivate);
  console.log('rest', rest);

  return (
    <Layout style={styleLayout}>
      <Header />
      <div style={styleWrapper}>
        <Content style={styleContent}>
          <Row>
            <Col span={24}>
              <h1>Dashboard x</h1>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <h1>Dashboard</h1>
            </Col>
            <Col span={6}>
              <h1>Dashboard</h1>
            </Col>
          </Row>
        </Content>
      </div>
      <Footer />
    </Layout>
  );
}
