import { createSlice } from '@reduxjs/toolkit';

import FETCH_STATUSES from 'enums/fetchStatuses';

type FetchingStatusProps = FETCH_STATUSES.ERROR | FETCH_STATUSES.LOADING | FETCH_STATUSES.SUCCESS | FETCH_STATUSES.IDLE;

interface ProposalProps {
  fetchStatus: FetchingStatusProps;
  proposalsArray: any;
  sendProposalStatus: FetchingStatusProps;
  sponsorProposalStatus: FetchingStatusProps;
}

interface StateProps {
  proposals: ProposalProps;
}

const proposalsSlice = createSlice({
  name: 'proposals',
  initialState: {
    fetchStatus: FETCH_STATUSES.IDLE,
    proposalsArray: [],
    sendProposalStatus: FETCH_STATUSES.IDLE,
    sponsorProposalStatus: FETCH_STATUSES.IDLE,
  },
  reducers: {
    setProposals: (state, action) => {
      // eslint-disable-next-line func-names
      state.proposalsArray = action.payload.slice().sort(function (a: any, b: any) {
        return -(a.createdAt - b.createdAt);
      });
    },
    setProposalStatus: (state, action) => {
      state.sendProposalStatus = action.payload;
    },
    setSponsorProposalStatus: (state, action) => {
      state.sponsorProposalStatus = action.payload;
    },
  },
});

export const selectFetchStatus = (state: StateProps) => state.proposals.fetchStatus;
export const selectProposalsArray = (state: StateProps) => state.proposals.proposalsArray;
export const selectProposalStatus = (state: StateProps) => state.proposals.sendProposalStatus;
export const selectSponsorProposalStatus = (state: StateProps) => state.proposals.sponsorProposalStatus;

export const { setProposals, setProposalStatus, setSponsorProposalStatus } = proposalsSlice.actions;

export default proposalsSlice.reducer;
