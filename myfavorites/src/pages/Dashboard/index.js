import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { toast } from 'react-toastify';
import { apiBeer, apiCartoon, apiSpace } from '../../services/api';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './styles.css';

const { Content } = Layout;

const styleLayout = {
  background: 'white',
};

export default function Dashboard({ isPrivate, ...rest }) {
  console.log('isPrivate', isPrivate);
  console.log('rest', rest);

  const [beerData, setBeerData] = useState([]);
  const [cartoonData, setCartoonData] = useState([]);
  const [spaceData, setSpaceData] = useState([]);
  console.log('beerData', beerData);
  console.log('cartoonData', cartoonData);
  console.log('spaceData', spaceData);

  const fetchbeerData = useCallback(async () => {
    await apiBeer
      .then((response) => {
        const { data } = response;

        setBeerData([...data]);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);
  const fetchCartoonData = useCallback(async () => {
    await apiCartoon
      .then((response) => {
        const { data } = response;

        setCartoonData([...data.results]);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);
  const fetchSpaceData = useCallback(async () => {
    await apiSpace
      .then((response) => {
        const { data } = response;

        setSpaceData([...data.docs]);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  useEffect(() => {
    fetchbeerData();
    fetchCartoonData();
    fetchSpaceData();
  }, [fetchbeerData, fetchCartoonData, fetchSpaceData]);

  return (
    <Layout style={styleLayout}>
      <Header />
      <div className="style-wrapper">
        <Content>
          {beerData.map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
              <img src={item.image_url} alt={item.name} />
            </div>
          ))}
          <br />
          {cartoonData.map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
              <img src={item.image} alt={item.name} />
            </div>
          ))}
          <br />
          {spaceData.map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
              <img src={item.flickr_images} alt={item.name} />
            </div>
          ))}
        </Content>
      </div>
      <Footer />
    </Layout>
  );
}

Dashboard.propTypes = {
  isPrivate: PropTypes.bool,
};

Dashboard.defaultProps = {
  isPrivate: false,
};

/* <Layout style={styleLayout}>
  <Header />
  <div className="style-wrapper">
    <Content>
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
</Layout>; */
