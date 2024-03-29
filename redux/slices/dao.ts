import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { gql } from '@apollo/client';

import FETCH_STATUSES from 'enums/fetchStatuses';
import { BigNumber } from 'ethers';

type FetchingStatusProps = FETCH_STATUSES;

interface DaoProps {
  fetchStatus: FetchingStatusProps;
  guildTributeTokenBalance?: BigNumber;
  processingReward?: BigNumber;
  proposalDeposit?: BigNumber;
  totalLoot?: BigNumber;
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
          processingReward
          proposalDeposit
          totalLoot
          totalShares
          tokenBalances {
            token {
              tokenAddress
            }
            tokenBalance
            guildBank
          }
        }
      }
    `,
  });
});

const daoSlice = createSlice({
  name: 'dao',
  initialState: {
    fetchStatus: FETCH_STATUSES.IDLE,
  } as DaoProps,
  reducers: {},
  extraReducers: builder => {
    // Get list of all votes
    builder.addCase(getTotalShares.fulfilled, (state, action) => {
      state.guildTributeTokenBalance = BigNumber.from(
        action.payload.data.moloches?.[0]?.tokenBalances.find((tb: any) => tb.guildBank).tokenBalance,
      );
      state.processingReward = BigNumber.from(action.payload.data.moloches?.[0]?.processingReward);
      state.proposalDeposit = BigNumber.from(action.payload.data.moloches?.[0]?.proposalDeposit);
      state.totalLoot = BigNumber.from(action.payload.data.moloches?.[0]?.totalLoot);
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

export const selectGuildTributeTokenBalance = (state: StateProps) => state.dao.guildTributeTokenBalance;
export const selectProcessingReward = (state: StateProps) => state.dao.processingReward;
export const selectProposalDeposit = (state: StateProps) => state.dao.proposalDeposit;
export const selectTotalShares = (state: StateProps) => state.dao.totalShares;
export const selectTotalLoot = (state: StateProps) => state.dao.totalLoot;

export default daoSlice.reducer;
