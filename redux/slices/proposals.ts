import { createAsyncThunk, createSlice, AsyncThunkOptions as OriginalAsyncThunkOptions } from '@reduxjs/toolkit';
import { gql, ApolloClient, NormalizedCacheObject } from '@apollo/client';

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

declare module '@reduxjs/toolkit' {
  export type AsyncThunkOptions = OriginalAsyncThunkOptions & {
    extra: { apollo: ApolloClient<NormalizedCacheObject> };
  };
}

// Get list of all proposals
export const getProposalsList = createAsyncThunk(
  'proposals/getProposalsList',
  async (userToken, { extra: { apollo } }) => {
    return apollo.query({
      query: gql`
        query addressVotes($first: Int, $skip: Int, $orderBy: String, $orderDirection: String) {
          proposals(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {
            id
            createdAt
            proposalIndex
            proposalId
            moloch {
              id
            }
            molochAddress
            memberAddress
            delegateKey
            applicant
            proposer
            sponsor
            sharesRequested
            lootRequested
            tributeOffered
            tributeToken
            tributeTokenSymbol
            tributeTokenDecimals
            paymentRequested
            paymentToken
            paymentTokenSymbol
            paymentTokenDecimals
            startingPeriod
            yesVotes
            noVotes
            sponsored
            sponsoredAt
            processed
            didPass
            cancelled
            aborted
            whitelist
            guildkick
            newMember
            trade
            details
            maxTotalSharesAndLootAtYesVote
            votes {
              uintVote
              id
              member {
                id
                memberAddress
              }
            }
            yesShares
            noShares
            votingPeriodStarts
            votingPeriodEnds
            gracePeriodEnds
            molochVersion
          }
        }
      `,
    });
  },
);

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
  extraReducers: builder => {
    // Get list of all votes
    builder.addCase(getProposalsList.fulfilled, (state, action) => {
      const result = action.payload.data.proposals.map((proposal: any) => {
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
      state.fetchStatus = FETCH_STATUSES.SUCCESS;
    });
    builder.addCase(getProposalsList.pending, (state, action) => {
      state.fetchStatus = FETCH_STATUSES.LOADING;
    });
    builder.addCase(getProposalsList.rejected, (state, action) => {
      state.fetchStatus = FETCH_STATUSES.ERROR;
    });
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
