import { createAsyncThunk, createSlice, AsyncThunkOptions as OriginalAsyncThunkOptions } from '@reduxjs/toolkit';
import { gql, ApolloClient, NormalizedCacheObject } from '@apollo/client';

import FETCH_STATUSES from 'enums/fetchStatuses';

type FetchingStatusProps = FETCH_STATUSES;

interface VotesProps {
  fetchStatus: FetchingStatusProps;
  votesArray: any;
}

interface StateProps {
  votes: VotesProps;
}

declare module '@reduxjs/toolkit' {
  export type AsyncThunkOptions = OriginalAsyncThunkOptions & {
    extra: { apollo: ApolloClient<NormalizedCacheObject> };
  };
}

// Get list of all votes
export const getVotesList = createAsyncThunk('votes/getVotesList', async (userToken, { extra: { apollo } }) => {
  return apollo.query({
    query: gql`
      query addressVotes($first: Int, $skip: Int, $orderBy: String, $orderDirection: String) {
        votes(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection) {
          id
          createdAt
          uintVote
          molochAddress
          memberAddress
          proposal {
            details
            id
          }
          member {
            shares
          }
        }
      }
    `,
  });
});

const votesSlice = createSlice({
  name: 'votes',
  initialState: {
    fetchStatus: FETCH_STATUSES.IDLE,
    votesArray: [],
  },
  reducers: {
    setVotes: (state, action) => {
      // eslint-disable-next-line func-names
      state.votesArray = action.payload.slice().sort(function (a: any, b: any) {
        return -(a.createdAt - b.createdAt);
      });
    },
    setFetchStatus: (state, action) => {
      state.fetchStatus = action.payload;
    },
  },
  extraReducers: builder => {
    // Get list of all votes
    builder.addCase(getVotesList.fulfilled, (state, action) => {
      state.votesArray = action.payload.data.votes.slice().sort(function (a: any, b: any) {
        return -(a.createdAt - b.createdAt);
      });
      state.fetchStatus = FETCH_STATUSES.SUCCESS;
    });
    builder.addCase(getVotesList.pending, (state, action) => {
      state.fetchStatus = FETCH_STATUSES.LOADING;
    });
    builder.addCase(getVotesList.rejected, (state, action) => {
      state.fetchStatus = FETCH_STATUSES.ERROR;
    });
  },
});

export const selectFetchStatus = (state: StateProps) => state.votes.fetchStatus;
export const selectVotesArray = (state: StateProps) => state.votes.votesArray;

export const { setVotes, setFetchStatus } = votesSlice.actions;

export default votesSlice.reducer;
