import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { HeartOutlined, HeartFilled } from '@ant-design/icons';
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

// const { Meta } = Card;
export default function Favorites({ isPrivate }) {
  const { signed } = store.getState().auth;

  if (window.location.pathname === '/favorites' && isPrivate && !signed) {
    window.location.replace('/admin');
  }

  const [editOn, setEditOn] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const storedFavorites = JSON.parse(
    localStorage.getItem('storedFavorites') || '[]'
  );

  const filteredFavorites = storedFavorites.filter(
    (elm) => elm.favorite === true
  );

  const [localFavorites, setLocalFavorites] = useState(storedFavorites);

  const updateFavorite = (item) => {
    setLocalFavorites(
      localFavorites.map((elm) => {
        if (elm.id === item.id) {
          return {
            ...elm,
            favorite: editOn,
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
        ? filteredFavorites
        : filteredFavorites.filter((item) =>
            item.name
              .toString()
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          ),
    [filteredFavorites, searchValue]
  );

  useEffect(() => {
    localStorage.setItem('storedFavorites', JSON.stringify(localFavorites));
  }, [localFavorites]);

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
        <Content>
          <List
            itemLayout="horizontal"
            dataSource={searchResults}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.image || item.image_url} />}
                  title={item.name}
                  description={item.description}
                />
                <button
                  style={styleBtn}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setEditOn(!editOn);
                    updateFavorite(item);
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
