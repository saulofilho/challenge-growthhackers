import { Link } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import { HeartTwoTone, UserOutlined } from '@ant-design/icons';

import './styles.css';

const { Header } = Layout;

const styleHeader = { background: '#bae7ff', padding: '0 0' };
const styleColMenu = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
};
const styleMenuLink = {
  paddingRight: '20px',
};

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
          <Col xs={12} lg={4} style={styleColMenu}>
            <Link to="/admin" style={styleMenuLink}>
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
