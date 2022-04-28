import { createAsyncThunk, createSlice, AsyncThunkOptions as OriginalAsyncThunkOptions } from '@reduxjs/toolkit';
import { gql, ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { shannonsToCkb } from 'utils/formatShannons';
import BigNumber from 'bignumber.js';
import numbro from 'numbro';

interface UserSlice {
  address: string;
  cktLayer1Address: string;
  cktLayer2Address: string;
  isLoggedIn: boolean;
  userShares: number;
  dckbBalance: number;
  ckbBalance: number;
  balanceSUDT: any;
  sessionMaintained: boolean;
}

interface StateProps {
  user: UserSlice;
}

declare module '@reduxjs/toolkit' {
  export type AsyncThunkOptions = OriginalAsyncThunkOptions & {
    extra: { apollo: ApolloClient<NormalizedCacheObject> };
  };
}

// Get list of users
export const getUsersList = createAsyncThunk('user/getUsersList', async (userToken, { extra: { apollo } }) => {
  const orderBy = 'createdAt';
  const orderDirection = 'desc';

  return apollo.query({
    query: gql`
      query addressVotes($orderBy: String, $orderDirection: String) {
        members(orderBy: $orderBy, orderDirection: $orderDirection) {
          id
          createdAt
          moloch
          molochAddress
          memberAddress
          delegateKey
          shares
          loot
          exists
          highestIndexYesVote
          tokenTribute
          didRagequit
          votes
          submissions
          tokenBalances
          rageQuits
          proposedToKick
          kicked
          jailed
        }
      }
    `,
    variables: { orderBy, orderDirection },
  });
});

const initialstate = {
  address: '',
  cktLayer1Address: '',
  cktLayer2Address: '',
  isLoggedIn: false,
  dckbBalance: 0,
  ckbBalance: 0,
  balanceSUDT: 0,
  userShares: 0,
  sessionMaintained: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialstate,
  reducers: {
    setUserAddress: (state, action) => {
      state.address = action.payload;
    },
    setCktLayer1Address: (state, action) => {
      state.cktLayer1Address = action.payload;
    },
    setCktLayer2Address: (state, action) => {
      state.cktLayer2Address = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setdckbBalance: (state, action) => {
      state.dckbBalance = numbro(new BigNumber(action.payload).dividedBy(10 ** 8).toNumber()).format('0.[00]');
    },
    setckbBalance: (state, action) => {
      state.ckbBalance = shannonsToCkb(action.payload);
    },
    setbalanceSUDT: (state, action) => {
      state.balanceSUDT = action.payload;
    },
    setUserShares: (state, action) => {
      state.userShares = Number(action.payload);
    },
    setSessionMaintained: (state, action) => {
      state.sessionMaintained = action.payload;
    },
    clearUser: () => initialstate,
  },
  extraReducers: builder => {
    // Get list of users
    builder.addCase(getUsersList.fulfilled, (state, action) => {
      const user = action.payload.data.members.filter((a: any) => {
        return a.memberAddress === state.address;
      });

      if (user[0]) {
        state.userShares = Number(user[0].shares);
      }
    });
    builder.addCase(getUsersList.pending, (state, action) => {});
    builder.addCase(getUsersList.rejected, (state, action) => {});
  },
});

export const selectUserAddress = (state: StateProps) => state.user.address;
export const selectCktLayer1Address = (state: StateProps) => state.user.cktLayer1Address;
export const selectCktLayer2Address = (state: StateProps) => state.user.cktLayer2Address;
export const selectIsLoggedIn = (state: StateProps) => state.user.isLoggedIn;
export const selectdckbBalance = (state: StateProps) => state.user.dckbBalance;
export const selectckbBalance = (state: StateProps) => state.user.ckbBalance;
export const selectbalanceSUDT = (state: StateProps) => state.user.balanceSUDT;
export const selectUserShares = (state: StateProps) => state.user.userShares;
export const selectessionMaintained = (state: StateProps) => state.user.sessionMaintained;

export const {
  setUserAddress,
  setCktLayer1Address,
  setCktLayer2Address,
  setIsLoggedIn,
  setdckbBalance,
  setckbBalance,
  setbalanceSUDT,
  setUserShares,
  setSessionMaintained,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer;
