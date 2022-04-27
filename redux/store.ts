import { configureStore } from '@reduxjs/toolkit';

import mainReducer from 'redux/slices/main';
import userReducer from 'redux/slices/user';
import themeReducer from 'redux/slices/theme';
import proposalsReducer from 'redux/slices/proposals';
import votesReducer from 'redux/slices/votes';

import modalTransactionReducer from 'redux/slices/modalTransaction';
import modaldCkbMintReducer from 'redux/slices/modaldCkbMint';
import modaldCkbTransferReducer from 'redux/slices/modaldCkbTransfer';

import apollo from 'config/apollo';

export default configureStore({
  reducer: {
    main: mainReducer,
    user: userReducer,
    theme: themeReducer,
    proposals: proposalsReducer,
    votes: votesReducer,

    modalTransaction: modalTransactionReducer,
    modaldCkbMint: modaldCkbMintReducer,
    modaldCkbTransfer: modaldCkbTransferReducer,
  },
  devTools: process.env.MODE !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { apollo },
      },
    }),
});
