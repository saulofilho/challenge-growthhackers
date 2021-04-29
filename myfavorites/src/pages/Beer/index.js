import React, { useState, useEffect, useCallback } from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Layout, Card, Row, Col, Input } from 'antd';
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

  return (
    <Layout style={styleLayout}>
      <Header />
      <div style={styleWrapper}>
        <Search
          style={styleInput}
          placeholder="input search text"
          onSearch={console.log()}
          enterButton
        />
        <Content>
          <Row gutter={[16, 16]}>
            {beerData && beerData.length ? (
              beerData.map((item) => (
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