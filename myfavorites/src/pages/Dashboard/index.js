import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
// import PropTypes from 'prop-types';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
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

  // Concat Data Patterns
  const concatDataPatterns = beerDataPattern.concat(
    cartoonDataPattern,
    spaceDataPattern
  );

  // Setting Data Patterns
  const dataPatterns = concatDataPatterns.map((elm) => ({
    ...elm,
    id: uuidv4(),
    favorite: false,
  }));

  // Fetch useEffect
  useEffect(() => {
    fetchBeerData();
    fetchCartoonData();
    fetchSpaceData();
  }, [fetchBeerData, fetchCartoonData, fetchSpaceData]);

  // Local Storage
  const storedData = JSON.parse(localStorage.getItem('storedData') || '[]');
  const storedFavorites = JSON.parse(
    localStorage.getItem('storedFavorites') || '[]'
  );
  const dataPersisted = JSON.parse(
    localStorage.getItem('dataPersisted') || '[]'
  );

  const [localData, setLocalData] = useState(dataPersisted);
  const [localFavorites, setLocalFavorites] = useState(storedFavorites);
  const [editOn, setEditOn] = useState(false);

  const updateFavorite = (item) => {
    setLocalFavorites((prevState) => [
      ...prevState,
      { ...item, favorite: editOn },
    ]);

    const favoritedData = storedData.map((elm) => {
      if (elm.id === item.id) {
        return {
          ...elm,
          favorite: editOn,
        };
      }
      return elm;
    });

    setLocalData(favoritedData);
    localStorage.setItem('storedData', JSON.stringify(favoritedData));
    localStorage.setItem('dataPersisted', JSON.stringify(favoritedData));
  };

  useEffect(() => {
    localStorage.setItem('storedData', JSON.stringify(dataPatterns));
    localStorage.setItem('storedFavorites', JSON.stringify(localFavorites));
  }, [dataPatterns, localFavorites]);

  return (
    <Layout style={styleLayout}>
      <Header />
      <Carousel autoplay>
        <div className="carousel-item">
          <Link to="/beer">Beer&apos;s category</Link>
        </div>
        <div className="carousel-item">
          <Link to="/cartoon">Cartoon&apos;s category</Link>
        </div>
        <div className="carousel-item">
          <Link to="/space">Space&apos;s category</Link>
        </div>
      </Carousel>
      <div className="style-wrapper-dashboard">
        <Content>
          <Row gutter={[16, 16]}>
            {localData && localData.length
              ? localData.map((item) => (
                  <Col xs={12} lg={6} key={item.id}>
                    <Card
                      hoverable
                      cover={
                        <img
                          alt={item.name}
                          src={item.image}
                          loading="lazy"
                          className="img-styled"
                        />
                      }
                    >
                      <button
                        className="btn-favorited"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setEditOn(!editOn);
                          updateFavorite(item);
                        }}
                      >
                        {item.favorite ? <HeartFilled /> : <HeartOutlined />}
                      </button>
                      <p>{item.category}</p>
                      <Meta
                        title={item.name}
                        description={
                          item.description && item.description.length > 100
                            ? `${item.description.substring(0, 100)}...`
                            : item.description
                        }
                      />
                    </Card>
                  </Col>
                ))
              : dataPatterns.map((item) => (
                  <Col xs={12} lg={6} key={item.id}>
                    <Card
                      hoverable
                      cover={
                        <img
                          alt={item.name}
                          src={item.image}
                          loading="lazy"
                          className="img-styled"
                        />
                      }
                    >
                      <button
                        className="btn-favorited"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setEditOn(!editOn);
                          updateFavorite(item);
                        }}
                      >
                        {item.favorite ? <HeartFilled /> : <HeartOutlined />}
                      </button>
                      <p>{item.category}</p>
                      <Meta
                        title={item.name}
                        description={
                          item.description && item.description.length > 100
                            ? `${item.description.substring(0, 100)}...`
                            : item.description
                        }
                      />
                    </Card>
                  </Col>
                ))}
          </Row>
        </Content>
      </div>
      <Footer />
    </Layout>
  );
}

// useEffect(() => {
//   if (!allData.length) {
//     setAllData([...dataPatterns]);
//   }
// }, [allData.length, dataPatterns]);

// Local Storage
// localStorage.setItem('storedData', JSON.stringify([...dataPatterns]));
// const storedData = JSON.parse(localStorage.getItem('storedData') || '{}');

// Filter Data
// const beerFiltered = dataPatterns.filter((elm) => elm.category === 'beer');
// const cartoonFiltered = dataPatterns.filter(
//   (elm) => elm.category === 'cartoon'
// );
// const spaceFiltered = dataPatterns.filter((elm) => elm.category === 'space');

// // Set Filtered Data
// const setBeerFiltered = () => {
//   setAllData(beerFiltered);
// };
// const setCartoonFiltered = () => {
//   setAllData(cartoonFiltered);
// };
// const setSpaceFiltered = () => {
//   setAllData(spaceFiltered);
// };

// console.log('xxx', allData);
// console.log('storedData', storedData);

// .sort(() => 0.5 - Math.random())

// https://react-select.com/home
