import { createSlice } from '@reduxjs/toolkit';

interface UserSlice {
  address: string;
  isLoggedIn: boolean;
}

interface StateProps {
  user: UserSlice;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    address: '',
    isLoggedIn: false,
  },
  reducers: {
    setUserAddress: (state, action) => {
      state.address = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const selectUserAddress = (state: StateProps) => state.user.address;
export const selectIsLoggedIn = (state: StateProps) => state.user.isLoggedIn;

export const { setUserAddress, setIsLoggedIn } = userSlice.actions;

export default userSlice.reducer;
