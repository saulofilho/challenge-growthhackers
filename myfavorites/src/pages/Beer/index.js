import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Layout, Card, Row, Col, Input, Pagination } from 'antd';
import { toast } from 'react-toastify';
import { apiBeer } from '../../services/api';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const { Content } = Layout;

const { Search } = Input;

const styleLayout = {
  background: 'white',
};
const styleBtn = {
  border: 'unset',
  background: 'transparent',
};
const styleWrapper = {
  maxWidth: '900px',
  minHeight: '100vh',
  height: '100%',
  width: '100%',
  margin: '0 auto',
  padding: '20px',
};
const styleInput = {
  padding: '20px 0',
};
const styleWrapperFilter = {
  padding: '0 0 20px',
};
const styleBtnFilter = {
  border: 'unset',
  background: 'transparent',
  paddingLeft: '20px',
};

const { Meta } = Card;

export default function Beer() {
  const [beerData, setBeerData] = useState([]);
  const [editOn, setEditOn] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [sortType, setSortType] = useState('name');
  const [orderProducts, setOrderProducts] = useState(false);

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

  useEffect(() => {
    fetchBeerData();
  }, [fetchBeerData]);

  const storedFavorites = JSON.parse(
    localStorage.getItem('storedFavorites') || '[]'
  );

  const [localFavorites, setLocalFavorites] = useState(storedFavorites);

  const updateFavorite = (item) => {
    setLocalFavorites((prevState) => [
      ...prevState,
      { ...item, favorite: editOn },
    ]);
  };

  useEffect(() => {
    localStorage.setItem('storedFavorites', JSON.stringify(localFavorites));
  }, [localFavorites]);

  const handleSearchTagChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const searchResults = useMemo(
    () =>
      !searchValue
        ? beerData
        : beerData.filter((item) =>
            item.name
              .toString()
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          ),
    [beerData, searchValue]
  );

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        name: 'name',
        tagline: 'tagline',
        description: 'description',
        first_brewed: 'first_brewed',
        brewers_tips: 'brewers_tips',
      };
      const sortProperty = types[type];
      const sorted = [...beerData].sort((a, b) =>
        b[sortProperty].localeCompare(a[sortProperty])
      );
      setBeerData(sorted);
    };

    sortArray(sortType);
  }, [sortType]);

  const reorderProducts = () => {
    beerData.reverse();
    setOrderProducts(!orderProducts);
  };

  return (
    <Layout style={styleLayout}>
      <Header />
      <div style={styleWrapper}>
        <Search
          style={styleInput}
          placeholder="input search text"
          onChange={handleSearchTagChanges}
          enterButton
        />
        <div style={styleWrapperFilter}>
          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="name">Name</option>
            <option value="tagline">Tagline</option>
            <option value="description">Description</option>
            <option value="first_brewed">First Brewed</option>
            <option value="brewers_tips">Brewers Tips</option>
          </select>
          <button
            type="button"
            onClick={() => reorderProducts()}
            style={styleBtnFilter}
          >
            {orderProducts ? <i>↑</i> : <i>↓</i>}
          </button>
        </div>
        <Content>
          <Row gutter={[16, 16]}>
            {searchResults && searchResults.length ? (
              searchResults.map((item) => (
                <Col xs={12} lg={6} key={item.id}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={item.name}
                        src={item.image_url}
                        loading="lazy"
                        className="img-styled"
                      />
                    }
                  >
                    <button
                      style={styleBtn}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setEditOn(!editOn);
                        updateFavorite(item);
                      }}
                    >
                      {storedFavorites.some((el) => el.name === item.name) ? (
                        <HeartFilled />
                      ) : (
                        <HeartOutlined />
                      )}
                    </button>
                    <Meta description={item.first_brewed} />
                    <Meta description={item.tagline} />
                    <Meta title={item.name} description={item.description} />
                    <Meta description={item.brewers_tips} />
                  </Card>
                </Col>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </Row>
        </Content>
        <Pagination defaultCurrent={1} total={beerData.length} />
      </div>
      <Footer />
    </Layout>
  );
}
