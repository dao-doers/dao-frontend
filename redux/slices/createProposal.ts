import { createSlice } from '@reduxjs/toolkit';

import CREATE_PROPOSAL_TYPE from 'enums/createProposalType';

type ProposalTypeProps = CREATE_PROPOSAL_TYPE;

interface CreateProposalProps {
  proposalType: ProposalTypeProps;
}

interface StateProps {
  createProposal: CreateProposalProps;
}

const createProposalSlice = createSlice({
  name: 'createProposal',
  initialState: {
    proposalType: CREATE_PROPOSAL_TYPE.NORMAL,
  },
  reducers: {
    setProposalType: (state, action) => {
      state.proposalType = action.payload;
    },
  },
});

export const selectProposalType = (state: StateProps) => state.createProposal.proposalType;

export const { setProposalType } = createProposalSlice.actions;

export default createProposalSlice.reducer;
