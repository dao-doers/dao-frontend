import { createSlice } from '@reduxjs/toolkit';

import NEW_PROPOSAL_TYPE from 'enums/newProposalType';

type NewProposalTypeProps = NEW_PROPOSAL_TYPE.NORMAL | NEW_PROPOSAL_TYPE.WITH_FUNDING | NEW_PROPOSAL_TYPE.KICK;

interface NewProposalProps {
  newProposalType: NewProposalTypeProps;
  transactionRecipe: any;
}

interface StateProps {
  newProposal: NewProposalProps;
}

const newProposalSlice = createSlice({
  name: 'newProposal',
  initialState: {
    newProposalType: NEW_PROPOSAL_TYPE.NORMAL,
    transactionRecipe: {},
  },
  reducers: {
    setNewProposalType: (state, action) => {
      state.newProposalType = action.payload;
    },
    setTransactionRecipe: (state, action) => {
      state.transactionRecipe = action.payload;
    },
  },
});

export const selectNewProposalType = (state: StateProps) => state.newProposal.newProposalType;
export const selectTransactionRecipe = (state: StateProps) => state.newProposal.transactionRecipe;

export const { setNewProposalType, setTransactionRecipe } = newProposalSlice.actions;

export default newProposalSlice.reducer;
