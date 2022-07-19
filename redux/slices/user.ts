import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { gql } from '@apollo/client';
import { BigNumber } from 'ethers';

type TLayer1Balance = { ckbBalance: BigNumber; dckbBalance: BigNumber };

interface Member {
  didRagequite: boolean;
  exists: boolean;
  memberAddress: string;
  shares: string;
}

interface UserSlice {
  address: string;
  cktLayer1Address: string;
  cktLayer2Address: string;
  isLoggedIn: boolean;
  sessionMaintained: boolean;
  isWalletsModalOpen: boolean;

  allMembers?: Member[];
  dckbBalance?: BigNumber;
  dckbBalanceInDao?: BigNumber;
  godwokenCkbBalance?: BigNumber;
  layer1Balance?: TLayer1Balance;
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
  allMembers: undefined,
  cktLayer1Address: '',
  cktLayer2Address: '',
  isLoggedIn: false,
  dckbBalance: undefined,
  dckbBalanceInDao: undefined,
  godwokenCkbBalance: undefined,
  layer1Balance: undefined,
  sessionMaintained: false,
  isWalletsModalOpen: false,
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
    setSessionMaintained: (state, action) => {
      state.sessionMaintained = action.payload;
    },
    setWalletsModalOpen: (state, action) => {
      state.isWalletsModalOpen = action.payload;
    },
    clearUser: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(getUsersList.fulfilled, (state, action) => {
      state.allMembers = action.payload.data.members;
    });
    builder.addCase(getUsersList.pending, (state, action) => {});
    builder.addCase(getUsersList.rejected, (state, action) => {});
  },
});

export const selectAllMembers = (state: StateProps) => state.user.allMembers;
export const selectUserAddress = (state: StateProps) => state.user.address;
export const selectCktLayer1Address = (state: StateProps) => state.user.cktLayer1Address;
export const selectCktLayer2Address = (state: StateProps) => state.user.cktLayer2Address;
export const selectIsLoggedIn = (state: StateProps) => state.user.isLoggedIn;
export const selectDckbBalance = (state: StateProps) => state.user.dckbBalance;
export const selectDckbBalanceInDao = (state: StateProps) => state.user.dckbBalanceInDao;
export const selectGodwokenCkbBalance = (state: StateProps) => state.user.godwokenCkbBalance;
export const selectLayer1Balance = (state: StateProps) => state.user.layer1Balance;
export const selectUserShares = (state: StateProps) => {
  if (!state.user.address) {
    return undefined;
  }

  if (state.user.allMembers) {
    const currentUserAsMember = state.user.allMembers.find(a => a.memberAddress === state.user.address);

    if (currentUserAsMember) {
      return Number(currentUserAsMember.shares);
    }
  }

  return 0;
};
export const selectessionMaintained = (state: StateProps) => state.user.sessionMaintained;
export const selectWalletsModalOpen = (state: StateProps) => state.user.isWalletsModalOpen;

export const {
  setUserAddress,
  setCktLayer1Address,
  setCktLayer2Address,
  setIsLoggedIn,
  setDckbBalance,
  setDckbBalanceInDao,
  setCkbBalance,
  setLayer1Balance,
  setSessionMaintained,
  setWalletsModalOpen,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer;
