import React, { useState, useEffect, useCallback } from 'react';
// import PropTypes from 'prop-types';
import { Layout, Carousel, Card, Row, Col } from 'antd';
import { toast } from 'react-toastify';
import { apiBeer, apiCartoon, apiSpace } from '../../services/api';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './styles.css';

const { Content } = Layout;

const styleLayout = {
  background: 'white',
};

const { Meta } = Card;

export default function Dashboard() {
  // Data
  const [allData, setAllData] = useState([]);
  const [beerData, setBeerData] = useState([]);
  const [cartoonData, setCartoonData] = useState([]);
  const [spaceData, setSpaceData] = useState([]);

  // Fetch
  const fetchBeerData = useCallback(async () => {
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

  // Array Pattern
  const beerDataPattern = beerData.map((elm) => ({
    name: elm.name,
    description: elm.description,
    image: elm.image_url,
    category: 'beer',
  }));
  const cartoonDataPattern = cartoonData.map((elm) => ({
    name: elm.name,
    description: elm.status,
    image: elm.image,
    category: 'cartoon',
  }));
  const spaceDataPattern = spaceData.map((elm) => ({
    name: elm.name,
    description: elm.description,
    image: elm.flickr_images,
    category: 'space',
  }));

  // Concat
  const concatDataPatterns = beerDataPattern.concat(
    cartoonDataPattern,
    spaceDataPattern
  );

  // Array Data Patterns
  const dataPatterns = concatDataPatterns.map((elm, index) => ({
    ...elm,
    id: index + 1,
    favorite: false,
  }));

  // useEffect
  useEffect(() => {
    fetchBeerData();
    fetchCartoonData();
    fetchSpaceData();
  }, [fetchBeerData, fetchCartoonData, fetchSpaceData]);

  useEffect(() => {
    if (!allData.length) {
      setAllData([...dataPatterns]);
    }
  }, [allData.length, dataPatterns]);

  // Local Storage
  localStorage.setItem('storedData', JSON.stringify([...dataPatterns]));
  const storedData = JSON.parse(localStorage.getItem('storedData') || '{}');

  // Filter Data
  const beerFiltered = dataPatterns.filter((elm) => elm.category === 'beer');
  const cartoonFiltered = dataPatterns.filter(
    (elm) => elm.category === 'cartoon'
  );
  const spaceFiltered = dataPatterns.filter((elm) => elm.category === 'space');

  // Set Filtered Data
  const setBeerFiltered = () => {
    setAllData(beerFiltered);
  };
  const setCartoonFiltered = () => {
    setAllData(cartoonFiltered);
  };
  const setSpaceFiltered = () => {
    setAllData(spaceFiltered);
  };

  console.log('xxx', allData);
  console.log('storedData', storedData);

  return (
    <Layout style={styleLayout}>
      <Header />
      <Carousel autoplay>
        <div>
          <button
            className="btn-carousel"
            type="button"
            onClick={() => setBeerFiltered()}
          >
            Beer&apos;s category
          </button>
        </div>
        <div>
          <button
            className="btn-carousel"
            type="button"
            onClick={() => setCartoonFiltered()}
          >
            Cartoon&apos;s category
          </button>
        </div>
        <div>
          <button
            className="btn-carousel"
            type="button"
            onClick={() => setSpaceFiltered()}
          >
            Space&apos;s category
          </button>
        </div>
      </Carousel>
      <div className="style-wrapper-dashboard">
        <Content>
          <Row gutter={[16, 16]}>
            {allData.length ? (
              allData
                .sort(() => 0.5 - Math.random())
                .map((item) => (
                  <Col xs={12} lg={6} key={item.id}>
                    <Card
                      hoverable
                      cover={
                        <img
                          alt={item.name}
                          src={item.image}
                          loading="lazy"
                          className="imgStyled"
                        />
                      }
                    >
                      <p>{item.category}</p>
                      <Meta
                        title={item.name}
                        description={
                          item.description.length > 100
                            ? `${item.description.substring(0, 100)}...`
                            : item.description
                        }
                      />
                    </Card>
                  </Col>
                ))
            ) : (
              <p>Loading...</p>
            )}
          </Row>
        </Content>
      </div>
      <Footer />
    </Layout>
  );
}

/* <Content>
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
</Content> */

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
