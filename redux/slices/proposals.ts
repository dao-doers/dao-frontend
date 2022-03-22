import { createSlice } from '@reduxjs/toolkit';

import FETCH_STATUSES from 'enums/fetchStatuses';
import PROPOSAL_STATUS from 'enums/proposalStatus';

const currentTime = new Date().getTime() / 1000;

type FetchingStatusProps = FETCH_STATUSES;

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
        if (proposal.sponsored === false && proposal.processed === false) {
          proposals.proposalStatus = PROPOSAL_STATUS.COLLECTING_FUNDS;
          proposals.yesVotes = Number(proposal.yesVotes);
          proposals.noVotes = Number(proposal.noVotes);
        } else if (
          proposal.sponsored === true &&
          currentTime < proposal.votingPeriodEnds &&
          currentTime < proposal.gracePeriodEnds &&
          proposal.processed === false
        ) {
          proposals.proposalStatus = PROPOSAL_STATUS.VOTING;
          proposals.yesVotes = Number(proposal.yesVotes);
          proposals.noVotes = Number(proposal.noVotes);
        } else if (
          proposal.sponsored === true &&
          currentTime > proposal.votingPeriodEnds &&
          currentTime < proposal.gracePeriodEnds &&
          proposal.processed === false
        ) {
          proposals.proposalStatus = PROPOSAL_STATUS.GRACE_PERIOD;
          proposals.yesVotes = Number(proposal.yesVotes);
          proposals.noVotes = Number(proposal.noVotes);
        } else if (
          proposal.sponsored === true &&
          currentTime > proposal.votingPeriodEnds &&
          currentTime > proposal.gracePeriodEnds &&
          proposal.processed === false
        ) {
          proposals.proposalStatus = PROPOSAL_STATUS.PROCEEDING;
          proposals.yesVotes = Number(proposal.yesVotes);
          proposals.noVotes = Number(proposal.noVotes);
        } else if (proposal.processed === true) {
          proposals.proposalStatus = PROPOSAL_STATUS.FINISHED;
          proposals.yesVotes = Number(proposal.yesVotes);
          proposals.noVotes = Number(proposal.noVotes);
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
    setFetchStatus: (state, action) => {
      state.fetchStatus = action.payload;
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
    setFinishedProposals: state => {
      state.sortedProposalsArray = state.proposalsArray.slice().filter((a: any) => {
        return a.proposalStatus === PROPOSAL_STATUS.FINISHED;
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
  setFetchStatus,
  setProposalStatus,
  setSponsorProposalStatus,
  setCollectingFundsProposals,
  setVotingProposals,
  setGracePeriodProposals,
  setProceedingProposals,
  setFinishedProposals,
  clearSorted,
} = proposalsSlice.actions;

export default proposalsSlice.reducer;
