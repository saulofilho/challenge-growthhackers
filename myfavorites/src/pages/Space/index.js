import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Layout, Card, Row, Col, Input } from 'antd';
import { toast } from 'react-toastify';
import { apiSpace } from '../../services/api';
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

export default function Space() {
  const [cartoonData, setSpaceData] = useState([]);
  const [editOn, setEditOn] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [sortType, setSortType] = useState('name');
  const [orderProducts, setOrderProducts] = useState(false);

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
    fetchSpaceData();
  }, [fetchSpaceData]);

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
        ? cartoonData
        : cartoonData.filter((item) =>
            item.name
              .toString()
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          ),
    [cartoonData, searchValue]
  );

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        name: 'name',
        company: 'company',
        description: 'description',
        country: 'country',
        type: 'type',
      };
      const sortProperty = types[type];
      const sorted = [...cartoonData].sort((a, b) =>
        b[sortProperty].localeCompare(a[sortProperty])
      );
      setSpaceData(sorted);
    };

    sortArray(sortType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);

  const reorderProducts = () => {
    cartoonData.reverse();
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
            <option value="company">Company</option>
            <option value="description">Description</option>
            <option value="country">Country</option>
            <option value="type">Type</option>
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
                        src={item.flickr_images}
                        loading="lazy"
                        className="img-styled"
                      />
                    }
                  >
                    <button
                      className="btn-favorited"
                      style={styleBtn}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setEditOn(!editOn);
                        updateFavorite(item);
                      }}
                    >
                      {storedFavorites.some((el) => el.id === item.id) ? (
                        <HeartFilled />
                      ) : (
                        <HeartOutlined />
                      )}
                    </button>
                    <Meta description={item.company} />
                    <Meta title={item.name} description={item.country} />
                    <Meta description={item.description} />
                    <Meta description={item.type} />
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
