import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { gql } from '@apollo/client';

import FETCH_STATUSES from 'enums/fetchStatuses';
import { BigNumber } from 'ethers';

type FetchingStatusProps = FETCH_STATUSES;

interface DaoProps {
  fetchStatus: FetchingStatusProps;
  totalShares?: BigNumber;
}

interface StateProps {
  dao: DaoProps;
}

export const getTotalShares = createAsyncThunk('dao/getTotalShares', async (userToken: any, { extra: { apollo } }) => {
  return apollo.query({
    query: gql`
      query totalShares {
        moloches {
          totalShares
        }
      }
    `,
  });
});

const daoSlice = createSlice({
  name: 'dao',
  initialState: {
    totalShares: undefined,
    fetchStatus: FETCH_STATUSES.IDLE,
  } as DaoProps,
  reducers: {
    setTotalShares: (state, action: { payload: BigNumber }) => {
      state.totalShares = action.payload;
    },
  },
  extraReducers: builder => {
    // Get list of all votes
    builder.addCase(getTotalShares.fulfilled, (state, action) => {
      state.totalShares = BigNumber.from(action.payload.data.moloches?.[0]?.totalShares);
      state.fetchStatus = FETCH_STATUSES.SUCCESS;
    });
    builder.addCase(getTotalShares.pending, state => {
      state.fetchStatus = FETCH_STATUSES.LOADING;
    });
    builder.addCase(getTotalShares.rejected, state => {
      state.fetchStatus = FETCH_STATUSES.ERROR;
    });
  },
});

export const selectTotalShares = (state: StateProps) => {
  return state.dao.totalShares;
};

export const { setTotalShares } = daoSlice.actions;

export default daoSlice.reducer;
