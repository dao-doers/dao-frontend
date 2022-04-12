import { createSlice } from '@reduxjs/toolkit';

interface UserSlice {
  address: string;
  ckbAddress: string;
  addressLayer2: string;
  isLoggedIn: boolean;
  userShares: number;
  dckbBalance: number;
  balanceSUDT: number;
  sessionMaintained: boolean;
}

interface StateProps {
  user: UserSlice;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    address: '',
    ckbAddress: '',
    addressLayer2: '',
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
    setUserAddressLayer2: (state, action) => {
      state.addressLayer2 = action.payload;
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
});

export const selectUserAddress = (state: StateProps) => state.user.address;
export const selectUserCKBAddress = (state: StateProps) => state.user.ckbAddress;
export const selectUserAddressLayer2 = (state: StateProps) => state.user.addressLayer2;
export const selectIsLoggedIn = (state: StateProps) => state.user.isLoggedIn;
export const selectdckbBalance = (state: StateProps) => state.user.dckbBalance;
export const selectbalanceSUDT = (state: StateProps) => state.user.balanceSUDT;
export const selectUserShares = (state: StateProps) => state.user.userShares;
export const selectessionMaintained = (state: StateProps) => state.user.sessionMaintained;

export const {
  setUserAddress,
  setUserCKBAddress,
  setUserAddressLayer2,
  setIsLoggedIn,
  setdckbBalance,
  setbalanceSUDT,
  setUserShares,
  setSessionMaintained,
} = userSlice.actions;

export default userSlice.reducer;
