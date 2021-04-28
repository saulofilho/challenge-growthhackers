import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import { HeartTwoTone, UserOutlined } from '@ant-design/icons';
import { signOut } from '../../store/modules/auth/actions';
import './styles.css';

const { Header } = Layout;

const styleHeader = { background: '#bae7ff', padding: '0 0' };

export default function HeaderWrapper() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Header style={styleHeader}>
      <div className="style-wrapper">
        <Row>
          <Col xs={12} lg={20}>
            <p>⭐My Favorites⭐</p>
          </Col>
          <Col xs={12} lg={4}>
            <Link to="/login">
              <UserOutlined />
            </Link>
            <Link to="/favorites">
              <HeartTwoTone />
            </Link>
            <button type="button" onClick={() => handleSignOut()}>
              Log out
            </button>
          </Col>
        </Row>
      </div>
    </Header>
  );
}
