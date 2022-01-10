import { createSlice } from '@reduxjs/toolkit';

interface UserSlice {
  address: string;
}

interface StateProps {
  user: UserSlice;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    address: '',
  },
  reducers: {
    setUserAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const selectUserAddress = (state: StateProps) => state.user.address;

export const { setUserAddress } = userSlice.actions;

export default userSlice.reducer;
