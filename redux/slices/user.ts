import { createAsyncThunk, createSlice, AsyncThunkOptions as OriginalAsyncThunkOptions } from '@reduxjs/toolkit';
import { gql, ApolloClient, NormalizedCacheObject } from '@apollo/client';

interface UserSlice {
  address: string;
  ckbAddress: string;
  layer2Address: string;
  isLoggedIn: boolean;
  userShares: number;
  dckbBalance: number;
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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    address: '',
    ckbAddress: '',
    layer2Address: '',
    isLoggedIn: false,
    dckbBalance: 0,
    balanceSUDT: 0,
    userShares: 0,
    sessionMaintained: false,
  },
  reducers: {
    setUserAddress: (state, action) => {
      state.address = action.payload;
    },
    setUserCKBAddress: (state, action) => {
      state.ckbAddress = action.payload;
    },
    setUserLayer2Address: (state, action) => {
      state.layer2Address = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setdckbBalance: (state, action) => {
      state.dckbBalance = action.payload;
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
export const selectUserCKBAddress = (state: StateProps) => state.user.ckbAddress;
export const selectUserLayer2Address = (state: StateProps) => state.user.layer2Address;
export const selectIsLoggedIn = (state: StateProps) => state.user.isLoggedIn;
export const selectdckbBalance = (state: StateProps) => state.user.dckbBalance;
export const selectbalanceSUDT = (state: StateProps) => state.user.balanceSUDT;
export const selectUserShares = (state: StateProps) => state.user.userShares;
export const selectessionMaintained = (state: StateProps) => state.user.sessionMaintained;

export const {
  setUserAddress,
  setUserCKBAddress,
  setUserLayer2Address,
  setIsLoggedIn,
  setdckbBalance,
  setbalanceSUDT,
  setUserShares,
  setSessionMaintained,
} = userSlice.actions;

export default userSlice.reducer;
