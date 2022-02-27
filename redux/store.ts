import { configureStore } from '@reduxjs/toolkit';

import userReducer from 'redux/slices/user';
import themeReducer from 'redux/slices/theme';
import proposalsReducer from 'redux/slices/proposals';
import votesReducer from 'redux/slices/votes';
import createProposalReducer from 'redux/slices/createProposal';

import modalTransactionReducer from 'redux/slices/modalTransaction';
import modalWireddCKBReducer from 'redux/slices/modalWireddCKB';

export default configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    proposals: proposalsReducer,
    votes: votesReducer,
    createProposal: createProposalReducer,

    modalTransaction: modalTransactionReducer,
    modalWireddCKB: modalWireddCKBReducer,
  },
  devTools: process.env.MODE !== 'production',
});
