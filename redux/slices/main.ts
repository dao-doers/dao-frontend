import { createSlice } from '@reduxjs/toolkit';

import CREATE_PROPOSAL_TYPE from 'enums/createProposalType';

interface MainProps {
  proposalType: CREATE_PROPOSAL_TYPE;
}

interface StateProps {
  main: MainProps;
}

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    proposalType: CREATE_PROPOSAL_TYPE.NORMAL,
  },
  reducers: {
    setProposalType: (state, action) => {
      state.proposalType = action.payload;
    },
  },
});

export const selectProposalType = (state: StateProps) => state.main.proposalType;

export const { setProposalType } = mainSlice.actions;

export default mainSlice.reducer;
