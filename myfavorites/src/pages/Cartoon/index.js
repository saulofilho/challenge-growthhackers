import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Layout, Card, Row, Col, Input, Pagination } from 'antd';
import { toast } from 'react-toastify';
import DataService from '../../services/fetchPagination';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { store } from '../../store';

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
const stylePagination = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px 0 0',
};

const { Meta } = Card;

export default function Cartoon() {
  const { signed } = store.getState().auth;

  const [cartoonData, setCartoonData] = useState([]);
  const [cartoonDataCount, setCartoonDataCount] = useState();
  const [editOn, setEditOn] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [sortType, setSortType] = useState('name');
  const [orderProducts, setOrderProducts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCartoonData = useCallback(async (pageNumber) => {
    await DataService.fetchCartoon(pageNumber)
      .then((response) => {
        const { data } = response;

        setCartoonData([...data.results]);
        setCartoonDataCount(data.info.count);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  useEffect(() => {
    fetchCartoonData(currentPage);
  }, [fetchCartoonData, currentPage]);

  const fetchNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const storedFavorites = JSON.parse(
    localStorage.getItem('storedFavorites') || '[]'
  );

  const [localFavorites, setLocalFavorites] = useState(storedFavorites);

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
        species: 'species',
        status: 'status',
      };
      const sortProperty = types[type];
      const sorted = [...cartoonData].sort((a, b) =>
        b[sortProperty].localeCompare(a[sortProperty])
      );
      setCartoonData(sorted);
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
          placeholder="Search here..."
          onChange={handleSearchTagChanges}
          enterButton
        />
        <div style={styleWrapperFilter}>
          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="name">Name</option>
            <option value="species">Species</option>
            <option value="status">Status</option>
          </select>
          <button
            type="button"
            onClick={() => reorderProducts()}
            style={styleBtnFilter}
          >
            {orderProducts ? <i>???</i> : <i>???</i>}
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
                        src={item.image}
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
                        saveFavorite(item);
                      }}
                    >
                      {localFavorites.some((el) => el.name === item.name) ? (
                        <HeartFilled />
                      ) : (
                        <HeartOutlined />
                      )}
                    </button>
                    <Meta title={item.name} description={item.species} />
                    <Meta description={item.status} />
                  </Card>
                </Col>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </Row>
        </Content>
        <Pagination
          defaultCurrent={1}
          pageSize={10}
          total={cartoonDataCount}
          onChange={fetchNextPage}
          style={stylePagination}
        />
      </div>
      <Footer />
    </Layout>
  );
}
