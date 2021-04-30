import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout, Input, List, Avatar } from 'antd';
import { store } from '../../store';
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

export default function Favorites({ isPrivate }) {
  const { signed } = store.getState().auth;

  if (window.location.pathname === '/favorites' && isPrivate && !signed) {
    window.location.replace('/admin');
  }

  const [editOn, setEditOn] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [sortType, setSortType] = useState('name');
  const [orderProducts, setOrderProducts] = useState(false);

  const storedFavorites = JSON.parse(
    localStorage.getItem('storedFavorites') || '[]'
  );

  const [localFavorites, setLocalFavorites] = useState(storedFavorites);

  const deleteFavorite = (item) => {
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
    window.location.reload();
  };

  const handleSearchTagChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const searchResults = useMemo(
    () =>
      !searchValue
        ? localFavorites
        : localFavorites.filter((item) =>
            item.name
              .toString()
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          ),
    [localFavorites, searchValue]
  );

  useEffect(() => {
    localStorage.setItem('storedFavorites', JSON.stringify(localFavorites));
  }, [localFavorites]);

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        name: 'name',
        description: 'description',
      };
      const sortProperty = types[type];
      const sorted = [...localFavorites].sort((a, b) =>
        b[sortProperty].localeCompare(a[sortProperty])
      );
      setLocalFavorites(sorted);
    };

    sortArray(sortType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);

  const reorderProducts = () => {
    localFavorites.reverse();
    setOrderProducts(!orderProducts);
  };

  const removeSameId = searchResults.filter(
    (v, i, a) => a.findIndex((t) => t.name === v.name) === i
  );

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
            <option value="description">Description</option>
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
          <List
            itemLayout="horizontal"
            dataSource={removeSameId}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={
                        item.image || item.image_url || item.flickr_images[0]
                      }
                    />
                  }
                  title={item.name}
                  description={item.description}
                />
                <button
                  className="btn-favorited"
                  style={styleBtn}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setEditOn(!editOn);
                    deleteFavorite(item);
                  }}
                >
                  Delete
                </button>
              </List.Item>
            )}
          />
        </Content>
      </div>
      <Footer />
    </Layout>
  );
}

Favorites.propTypes = {
  isPrivate: PropTypes.bool,
};

Favorites.defaultProps = {
  isPrivate: true,
};
