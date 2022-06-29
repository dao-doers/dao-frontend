import { configureStore } from '@reduxjs/toolkit';

import mainReducer from 'redux/slices/main';
import userReducer from 'redux/slices/user';
import themeReducer from 'redux/slices/theme';
import proposalsReducer from 'redux/slices/proposals';
import votesReducer from 'redux/slices/votes';
import daoReducer from 'redux/slices/dao';

import modalTransactionReducer from 'redux/slices/modalTransaction';
import modaldCkbMintReducer from 'redux/slices/modaldCkbMint';

import apollo from 'config/apollo';

const store = configureStore({
  reducer: {
    main: mainReducer,
    user: userReducer,
    theme: themeReducer,
    proposals: proposalsReducer,
    votes: votesReducer,
    modalTransaction: modalTransactionReducer,
    modaldCkbMint: modaldCkbMintReducer,
    dao: daoReducer,
  },
  devTools: process.env.MODE !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { apollo },
      },
      serializableCheck: false,
    }),
});

export type Store = ReturnType<typeof store.getState>;

export default store;
