import React from 'react';
import PropTypes from 'prop-types';

import { store } from '../../store';

export default function Favorites({ isPrivate }) {
  const { signed } = store.getState().auth;

  console.log('isPrivate', isPrivate);
  console.log('signed', signed);

  if (window.location.pathname === '/favorites' && isPrivate && !signed) {
    window.location.replace('/');
  }

  return (
    <>
      <h1>favorites</h1>
    </>
  );
}

Favorites.propTypes = {
  isPrivate: PropTypes.bool,
};

Favorites.defaultProps = {
  isPrivate: true,
};
