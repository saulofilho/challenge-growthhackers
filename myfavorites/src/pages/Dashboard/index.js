import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Layout, Carousel, Card, Row, Col, Input } from 'antd';
import { toast } from 'react-toastify';
import { apiBeer, apiCartoon, apiSpace } from '../../services/api';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { store } from '../../store';

import './styles.css';

const { Content } = Layout;

const { Search } = Input;

// Styles
const styleLayout = {
  background: 'white',
};
const styleWrapper = {
  maxWidth: '900px',
  width: '100%',
  minHeight: '100vh',
  margin: '0 auto',
  height: '100%',
  padding: '20px',
};
const styleInput = {
  padding: '20px 0',
};

const { Meta } = Card;

export default function Dashboard() {
  const { signed } = store.getState().auth;

  // Data
  const [beerData, setBeerData] = useState([]);
  const [cartoonData, setCartoonData] = useState([]);
  const [spaceData, setSpaceData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

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

  // Concat Data
  const concatData = beerData.concat(cartoonData, spaceData);

  // Setting Data
  const dataLocalStorage = concatData.map((elm, index) => ({
    ...elm,
    id: index + 1,
  }));

  // Fetch useEffect
  useEffect(() => {
    fetchBeerData();
    fetchCartoonData();
    fetchSpaceData();
  }, [fetchBeerData, fetchCartoonData, fetchSpaceData]);

  // Local Storage
  const storedFavorites = JSON.parse(
    localStorage.getItem('storedFavorites') || '[]'
  );

  const [localFavorites, setLocalFavorites] = useState(storedFavorites);
  const [editOn, setEditOn] = useState(false);

  const saveFavorite = (item) => {
    if (signed) {
      if (!localFavorites.find((el) => el.id === item.id)) {
        setLocalFavorites((prevState) => [...prevState, { ...item }]);
      } else {
        const i = localFavorites.findIndex((el) => el.id === item.id);
        if (i !== -1) {
          localFavorites.splice(i, 1);
        }

        localFavorites.splice(i, 1);

        setLocalFavorites(
          localFavorites.map((elm) => {
            if (elm.id === item.id) {
              return {
                ...elm,
              };
            }
            return elm;
          })
        );
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('storedFavorites', JSON.stringify(localFavorites));
  }, [localFavorites]);

  const handleSearchChanges = (e) => {
    setSearchValue(e.target.value);
  };

  // Search
  const searchResults = useMemo(
    () =>
      !searchValue
        ? dataLocalStorage
        : dataLocalStorage.filter((item) =>
            item.name
              .toString()
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          ),
    [dataLocalStorage, searchValue]
  );

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
      <div style={styleWrapper}>
        <Search
          style={styleInput}
          placeholder="Search here..."
          onChange={handleSearchChanges}
          enterButton
        />
        <Content>
          <Row gutter={[16, 16]}>
            {searchResults && searchResults.length
              ? searchResults.map((item) => (
                  <Col xs={12} lg={6} key={item.id}>
                    <Card
                      hoverable
                      cover={
                        <img
                          alt={item.name}
                          src={
                            item.image ||
                            item.image_url ||
                            item.flickr_images[0]
                          }
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
                          saveFavorite(item);
                        }}
                      >
                        {localFavorites.some((el) => el.name === item.name) ? (
                          <HeartFilled />
                        ) : (
                          <HeartOutlined />
                        )}
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
              : null}
          </Row>
        </Content>
      </div>
      <Footer />
    </Layout>
  );
}
