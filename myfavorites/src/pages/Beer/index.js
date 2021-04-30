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

const { Meta } = Card;

export default function Beer() {
  const [beerData, setBeerData] = useState([]);
  const [editOn, setEditOn] = useState(false);
  const [searchValue, setSearchValue] = useState('');

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

  // const updateFavorite = (item) => {
  //   setLocalFavorites((prevState) => [
  //     ...prevState,
  //     { ...item, favorite: editOn },
  //   ]);

  //   const favoritedData = storedData.map((elm) => {
  //     if (elm.id === item.id) {
  //       return {
  //         ...elm,
  //         favorite: editOn,
  //       };
  //     }
  //     return elm;
  //   });

  //   setLocalData(favoritedData);
  //   localStorage.setItem('storedData', JSON.stringify(favoritedData));
  //   localStorage.setItem('dataPersisted', JSON.stringify(favoritedData));
  // };

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

  const [sortType, setSortType] = useState('name');

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        name: 'name',
        tagline: 'tagline',
        description: 'description',
      };
      const sortProperty = types[type];
      const sorted = [...beerData].sort((a, b) =>
        b[sortProperty].localeCompare(a[sortProperty])
      );
      setBeerData(sorted);
    };

    sortArray(sortType);
  }, [sortType]);

  console.log('sortType', sortType);
  console.log('beerData', beerData);

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
        <select onChange={(e) => setSortType(e.target.value)}>
          <option value="name">name</option>
          <option value="tagline">tagline</option>
          <option value="description">description</option>
        </select>
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
                        // updateFavorite(item);
                      }}
                    >
                      {item.favorite ? <HeartFilled /> : <HeartOutlined />}
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
