import { createSlice } from '@reduxjs/toolkit';

import FETCH_STATUSES from 'enums/fetchStatuses';

type FetchingStatusProps = FETCH_STATUSES.ERROR | FETCH_STATUSES.LOADING | FETCH_STATUSES.SUCCESS | FETCH_STATUSES.IDLE;

interface VotesProps {
  fetchStatus: FetchingStatusProps;
  votesArray: any;
}

interface StateProps {
  votes: VotesProps;
}

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
  },
});

export const selectFetchStatus = (state: StateProps) => state.votes.fetchStatus;
export const selectVotesArray = (state: StateProps) => state.votes.votesArray;

export const { setVotes } = votesSlice.actions;

export default votesSlice.reducer;
