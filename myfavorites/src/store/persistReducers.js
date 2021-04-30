import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'star',
      storage,
      whitelist: ['auth', 'email', 'user'],
    },
    reducers
  );

  return persistedReducer;
};
