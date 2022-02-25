import { createSlice } from '@reduxjs/toolkit';

interface UserSlice {
  address: string;
  isLoggedIn: boolean;
  userShares: number;
}

interface StateProps {
  user: UserSlice;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    address: '',
    isLoggedIn: false,
    userShares: 0,
  },
  reducers: {
    setUserAddress: (state, action) => {
      state.address = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserShares: (state, action) => {
      state.userShares = Number(action.payload);
    },
  },
});

export const selectUserAddress = (state: StateProps) => state.user.address;
export const selectIsLoggedIn = (state: StateProps) => state.user.isLoggedIn;
export const selectUserShares = (state: StateProps) => state.user.userShares;

export const { setUserAddress, setIsLoggedIn, setUserShares } = userSlice.actions;

export default userSlice.reducer;
