import { createSlice } from '@reduxjs/toolkit';
import { ethers, providers } from 'ethers';

import CREATE_PROPOSAL_TYPE from 'enums/createProposalType';

interface MainProps {
  provider: providers.JsonRpcProvider;
  chainId: string;
  proposalType: CREATE_PROPOSAL_TYPE;
}

interface StateProps {
  main: MainProps;
}

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    provider: new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL || ''),
    chainId: '',
    proposalType: CREATE_PROPOSAL_TYPE.NORMAL,
  },
  reducers: {
    setProvider: (state, action) => {
      state.provider = action.payload;
    },
    setChainId: (state, action) => {
      state.chainId = action.payload;
    },
    setProposalType: (state, action) => {
      state.proposalType = action.payload;
    },
  },
});

export const selectProvider = (state: StateProps) => state.main.provider;
export const selectChainId = (state: StateProps) => state.main.chainId;
export const selectProposalType = (state: StateProps) => state.main.proposalType;

export const { setProvider, setChainId, setProposalType } = mainSlice.actions;

export default mainSlice.reducer;
