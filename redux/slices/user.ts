import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { gql } from '@apollo/client';
import { BigNumber } from 'ethers';

type TLayer1Balance = { ckbBalance: BigNumber; dckbBalance: BigNumber };

interface UserSlice {
  address: string;
  cktLayer1Address: string;
  cktLayer2Address: string;
  isLoggedIn: boolean;
  userShares: number;
  sessionMaintained: boolean;
  isWalletsModalOpen: boolean;

  godwokenCkbBalance?: BigNumber;
  dckbBalance?: BigNumber;
  dckbBalanceInDao?: BigNumber;
  layer1Balance?: TLayer1Balance;
  guildDckbBalance?: BigNumber;
}

interface StateProps {
  user: UserSlice;
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

const initialState: UserSlice = {
  address: '',
  cktLayer1Address: '',
  cktLayer2Address: '',
  isLoggedIn: false,
  dckbBalance: undefined,
  dckbBalanceInDao: undefined,
  godwokenCkbBalance: undefined,
  layer1Balance: undefined,
  userShares: 0,
  sessionMaintained: false,
  isWalletsModalOpen: false,
  guildDckbBalance: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
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
    setDckbBalance: (state, action: { payload: BigNumber }) => {
      state.dckbBalance = action.payload;
    },
    setDckbBalanceInDao: (state, action: { payload: BigNumber }) => {
      state.dckbBalanceInDao = action.payload;
    },
    setCkbBalance: (state, action: { payload: BigNumber }) => {
      state.godwokenCkbBalance = action.payload;
    },
    setLayer1Balance: (state, action: { payload: TLayer1Balance }) => {
      state.layer1Balance = action.payload;
    },
    setUserShares: (state, action) => {
      state.userShares = Number(action.payload);
    },
    setSessionMaintained: (state, action) => {
      state.sessionMaintained = action.payload;
    },
    setWalletsModalOpen: (state, action) => {
      state.isWalletsModalOpen = action.payload;
    },
    setGuildDckbBalance: (state, action: { payload: BigNumber }) => {
      state.guildDckbBalance = action.payload;
    },
    clearUser: () => initialState,
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
export const selectDckbBalance = (state: StateProps) => state.user.dckbBalance;
export const selectDckbBalanceInDao = (state: StateProps) => state.user.dckbBalanceInDao;
export const selectGodwokenCkbBalance = (state: StateProps) => state.user.godwokenCkbBalance;
export const selectLayer1Balance = (state: StateProps) => state.user.layer1Balance;
export const selectUserShares = (state: StateProps) => state.user.userShares;
export const selectessionMaintained = (state: StateProps) => state.user.sessionMaintained;
export const selectWalletsModalOpen = (state: StateProps) => state.user.isWalletsModalOpen;
export const selectGuildDckbBalance = (state: StateProps) => state.user.guildDckbBalance;

export const {
  setUserAddress,
  setCktLayer1Address,
  setCktLayer2Address,
  setIsLoggedIn,
  setDckbBalance,
  setDckbBalanceInDao,
  setCkbBalance,
  setLayer1Balance,
  setUserShares,
  setSessionMaintained,
  setWalletsModalOpen,
  clearUser,
  setGuildDckbBalance,
} = userSlice.actions;

export default userSlice.reducer;
