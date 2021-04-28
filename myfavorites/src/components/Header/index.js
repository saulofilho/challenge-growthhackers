import { Link } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import { HeartTwoTone, UserOutlined } from '@ant-design/icons';

import './styles.css';

const { Header } = Layout;

const styleHeader = { background: '#bae7ff', padding: '0 0' };

export default function HeaderWrapper() {
  return (
    <Header style={styleHeader}>
      <div className="style-wrapper">
        <Row>
          <Col xs={12} lg={20}>
            <Link to="/">
              <p>⭐My Favorites⭐</p>
            </Link>
          </Col>
          <Col xs={12} lg={4}>
            <Link to="/login">
              <UserOutlined />
            </Link>
            <Link to="/favorites">
              <HeartTwoTone />
            </Link>
          </Col>
        </Row>
      </div>
    </Header>
  );
}
