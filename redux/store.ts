import { configureStore } from '@reduxjs/toolkit';

import mainReducer from 'redux/slices/main';
import userReducer from 'redux/slices/user';
import themeReducer from 'redux/slices/theme';
import proposalsReducer from 'redux/slices/proposals';
import votesReducer from 'redux/slices/votes';

import modalTransactionReducer from 'redux/slices/modalTransaction';
import modalWireddCKBReducer from 'redux/slices/modalWireddCKB';
import modalSUDTTransferReducer from 'redux/slices/modalSUDTTransfer';

import apollo from 'config/apollo';

export default configureStore({
  reducer: {
    main: mainReducer,
    user: userReducer,
    theme: themeReducer,
    proposals: proposalsReducer,
    votes: votesReducer,

    modalTransaction: modalTransactionReducer,
    modalWireddCKB: modalWireddCKBReducer,
    modalSUDTTransfer: modalSUDTTransferReducer,
  },
  devTools: process.env.MODE !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { apollo },
      },
    }),
});
