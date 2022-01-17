import { createSlice } from '@reduxjs/toolkit';

import FETCH_STATUSES from 'enums/fetchStatuses';
import PROPOSAL_STATUS from 'enums/proposalStatus';

const currentTime = new Date().getTime() / 1000;

type FetchingStatusProps = FETCH_STATUSES.ERROR | FETCH_STATUSES.LOADING | FETCH_STATUSES.SUCCESS | FETCH_STATUSES.IDLE;

interface ProposalProps {
  fetchStatus: FetchingStatusProps;
  proposalsArray: any;
  sendProposalStatus: FetchingStatusProps;
  sponsorProposalStatus: FetchingStatusProps;
  sortedProposalsArray: any;
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
    sortedProposalsArray: [],
  },
  reducers: {
    setProposals: (state, action) => {
      const result = action.payload.map((proposal: any) => {
        const proposals = { ...proposal };
        if (proposal.sponsored === false) {
          proposals.proposalStatus = PROPOSAL_STATUS.COLLECTING_FUNDS;
        } else if (
          proposal.sponsored === true &&
          currentTime < proposal.votingPeriodEnds &&
          currentTime < proposal.gracePeriodEnds
        ) {
          proposals.proposalStatus = PROPOSAL_STATUS.VOTING;
        } else if (
          proposal.sponsored === true &&
          currentTime > proposal.votingPeriodEnds &&
          currentTime < proposal.gracePeriodEnds
        ) {
          proposals.proposalStatus = PROPOSAL_STATUS.GRACE_PERIOD;
        } else if (
          proposal.sponsored === true &&
          currentTime > proposal.votingPeriodEnds &&
          currentTime > proposal.gracePeriodEnds
        ) {
          proposals.proposalStatus = PROPOSAL_STATUS.PROCEEDING;
        } else {
          return null;
        }
        return proposals;
      });

      state.proposalsArray = result.slice().sort((a: any, b: any) => {
        return -(a.createdAt - b.createdAt);
      });
      state.sortedProposalsArray = result.slice().sort((a: any, b: any) => {
        return -(a.createdAt - b.createdAt);
      });
    },
    setProposalStatus: (state, action) => {
      state.sendProposalStatus = action.payload;
    },
    setSponsorProposalStatus: (state, action) => {
      state.sponsorProposalStatus = action.payload;
    },
    setCollectingFundsProposals: state => {
      state.sortedProposalsArray = state.proposalsArray.slice().filter((a: any) => {
        return a.proposalStatus === PROPOSAL_STATUS.COLLECTING_FUNDS;
      });
    },
    setVotingProposals: state => {
      state.sortedProposalsArray = state.proposalsArray.slice().filter((a: any) => {
        return a.proposalStatus === PROPOSAL_STATUS.VOTING;
      });
    },
    setGracePeriodProposals: state => {
      state.sortedProposalsArray = state.proposalsArray.slice().filter((a: any) => {
        return a.proposalStatus === PROPOSAL_STATUS.GRACE_PERIOD;
      });
    },
    setProceedingProposals: state => {
      state.sortedProposalsArray = state.proposalsArray.slice().filter((a: any) => {
        return a.proposalStatus === PROPOSAL_STATUS.PROCEEDING;
      });
    },
    clearSorted: state => {
      state.sortedProposalsArray = state.proposalsArray;
    },
  },
});

export const selectFetchStatus = (state: StateProps) => state.proposals.fetchStatus;
export const selectProposalsArray = (state: StateProps) => state.proposals.proposalsArray;
export const selectProposalStatus = (state: StateProps) => state.proposals.sendProposalStatus;
export const selectSponsorProposalStatus = (state: StateProps) => state.proposals.sponsorProposalStatus;
export const selectSortedProposalsArray = (state: StateProps) => state.proposals.sortedProposalsArray;

export const {
  setProposals,
  setProposalStatus,
  setSponsorProposalStatus,
  setCollectingFundsProposals,
  setVotingProposals,
  setGracePeriodProposals,
  setProceedingProposals,
  clearSorted,
} = proposalsSlice.actions;

export default proposalsSlice.reducer;
