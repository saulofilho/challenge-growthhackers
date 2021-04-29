import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
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
  // const [allData, setAllData] = useState([]);
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
  const dataPatterns = concatDataPatterns.map((elm, index) => ({
    ...elm,
    id: index + 1,
    favorite: false,
  }));

  // Fetch useEffect
  useEffect(() => {
    fetchBeerData();
    fetchCartoonData();
    fetchSpaceData();
  }, [fetchBeerData, fetchCartoonData, fetchSpaceData]);

  // Favorites
  const storedData = JSON.parse(localStorage.getItem('storedData') || '{}');
  const storedFavorites = JSON.parse(
    localStorage.getItem('storedFavorites') || '{}'
  );

  const [localData, setLocalData] = useState([storedData || []]);
  const [localFavorites, setLocalFavorites] = useState([storedFavorites || []]);

  const updateFavorite = (item) => {
    setLocalData((prevState) => [...prevState, item]);
    setLocalFavorites((prevState) => [
      ...prevState,
      { ...item, favorite: true },
    ]);

    const favoritedData = storedFavorites.map((elm) => {
      if (elm.id === item.id) {
        return {
          ...elm,
          favorite: !false,
        };
      }
      return elm;
    });

    setLocalData(favoritedData);

    console.log('item---------->>>', item);
    console.log('favoritedData---------->>>', favoritedData);
  };

  useEffect(() => {
    localStorage.setItem('storedData', JSON.stringify(dataPatterns));
    localStorage.setItem('storedFavorites', JSON.stringify(localFavorites));
  }, [dataPatterns, localFavorites]);

  // useEffect(() => {
  //   const data = localStorage.getItem('data') || '{}';
  //   JSON.parse(data);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('data', JSON.stringify(dataPatterns));
  // });

  // const updateFavorite = useCallback(
  //   (id) => {
  //     const upData = localData.map((elm) => (elm.id === id ? favorite : elm));

  //     setFavorite(!favorite);
  //     setLocalData(upData);
  //     localStorage.setItem('storedDataTag', JSON.stringify(upData));
  //   },
  //   [localData, favorite]
  // );

  console.log('storedFavorites', storedFavorites);
  console.log('localData', localData);
  console.log('storedFavorites', storedFavorites);

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
            {storedData.length ? (
              storedData.map((item) => (
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
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        updateFavorite(item);
                      }}
                    >
                      {item.favorite === false ? (
                        <HeartOutlined />
                      ) : (
                        <HeartFilled />
                      )}
                    </button>

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
