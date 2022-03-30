import { createSlice } from '@reduxjs/toolkit';

interface UserSlice {
  address: string;
  isLoggedIn: boolean;
  userShares: number;
  dckbBalance: number;
  sessionMaintained: boolean;
}

interface StateProps {
  user: UserSlice;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    address: '',
    isLoggedIn: false,
    dckbBalance: 0,
    userShares: 0,
    sessionMaintained: false,
  },
  reducers: {
    setUserAddress: (state, action) => {
      state.address = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setdckbBalance: (state, action) => {
      state.dckbBalance = action.payload;
    },
    setUserShares: (state, action) => {
      state.userShares = Number(action.payload);
    },
    setSessionMaintained: (state, action) => {
      state.sessionMaintained = action.payload;
    },
  },
});

export const selectUserAddress = (state: StateProps) => state.user.address;
export const selectIsLoggedIn = (state: StateProps) => state.user.isLoggedIn;
export const selectdckbBalance = (state: StateProps) => state.user.dckbBalance;
export const selectUserShares = (state: StateProps) => state.user.userShares;
export const selectessionMaintained = (state: StateProps) => state.user.sessionMaintained;

export const { setUserAddress, setIsLoggedIn, setdckbBalance, setUserShares, setSessionMaintained } = userSlice.actions;

export default userSlice.reducer;
