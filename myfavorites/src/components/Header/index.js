import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import { HeartTwoTone, UserOutlined } from '@ant-design/icons';
import { signOut } from '../../store/modules/auth/actions';
import './styles.css';

import { store } from '../../store';

const { Header } = Layout;

const styleHeader = { background: '#bae7ff', padding: '0 0' };

export default function HeaderWrapper({ isPrivate, ...rest }) {
  const { signed } = store.getState().auth;

  console.log('isPrivate', isPrivate);
  console.log('rest', rest);
  console.log('signed', signed);

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
            {signed ? (
              <Link to="/favorites">
                <HeartTwoTone />
              </Link>
            ) : (
              <Link to="/favorites">
                <HeartTwoTone />
              </Link>
            )}

            <button type="button" onClick={() => handleSignOut()}>
              Log out
            </button>
          </Col>
        </Row>
      </div>
    </Header>
  );
}

HeaderWrapper.propTypes = {
  isPrivate: PropTypes.bool,
};

HeaderWrapper.defaultProps = {
  isPrivate: false,
};
