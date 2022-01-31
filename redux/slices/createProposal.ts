import { createSlice } from '@reduxjs/toolkit';

import CREATE_PROPOSAL_TYPE from 'enums/createProposalType';

type ProposalTypeProps = CREATE_PROPOSAL_TYPE.NORMAL | CREATE_PROPOSAL_TYPE.WITH_FUNDING | CREATE_PROPOSAL_TYPE.KICK;

interface CreateProposalProps {
  proposalType: ProposalTypeProps;
  transactionRecipe: any;
}

interface StateProps {
  createProposal: CreateProposalProps;
}

const createProposalSlice = createSlice({
  name: 'createProposal',
  initialState: {
    proposalType: CREATE_PROPOSAL_TYPE.NORMAL,
    transactionRecipe: {},
  },
  reducers: {
    setProposalType: (state, action) => {
      state.proposalType = action.payload;
    },
    setTransactionRecipe: (state, action) => {
      state.transactionRecipe = action.payload;
    },
  },
});

export const selectProposalType = (state: StateProps) => state.createProposal.proposalType;
export const selectTransactionRecipe = (state: StateProps) => state.createProposal.transactionRecipe;

export const { setProposalType, setTransactionRecipe } = createProposalSlice.actions;

export default createProposalSlice.reducer;
