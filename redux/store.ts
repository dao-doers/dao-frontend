import { configureStore } from '@reduxjs/toolkit';

import userReducer from 'redux/slices/user';
import themeReducer from 'redux/slices/theme';
import proposalsReducer from 'redux/slices/proposals';
import votesReducer from 'redux/slices/votes';
import newProposalReducer from 'redux/slices/newProposal';

import modalExampleReducer from 'redux/slices/modalExample';

export default configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    proposals: proposalsReducer,
    votes: votesReducer,
    newProposal: newProposalReducer,

    modalExample: modalExampleReducer,
  },
});
