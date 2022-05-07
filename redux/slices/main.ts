import { createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

import CREATE_PROPOSAL_TYPE from 'enums/createProposalType';

interface MainProps {
  provider: any;
  proposalType: CREATE_PROPOSAL_TYPE;
}

interface StateProps {
  main: MainProps;
}

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    provider: new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL || ''),
    proposalType: CREATE_PROPOSAL_TYPE.NORMAL,
  },
  reducers: {
    setProposalType: (state, action) => {
      state.proposalType = action.payload;
    },
    setProvider: (state, action) => {
      state.provider = action.payload;
    },
  },
});

export const selectProvider = (state: StateProps) => state.main.provider;
export const selectProposalType = (state: StateProps) => state.main.proposalType;

export const { setProvider, setProposalType } = mainSlice.actions;

export default mainSlice.reducer;
