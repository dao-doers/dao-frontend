import { createSlice } from '@reduxjs/toolkit';

interface ModaldCkbMintProps {
  isOpen: boolean;
}

interface StateProps {
  modaldCkbMint: ModaldCkbMintProps;
}

const initialState = {
  isOpen: false,
};

const modaldCkbMintSlice = createSlice({
  name: 'modaldCkbMint',
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setClose: () => initialState,
  },
});

export const selectOpen = (state: StateProps) => state.modaldCkbMint.isOpen;

export const { setOpen, setClose } = modaldCkbMintSlice.actions;

export default modaldCkbMintSlice.reducer;
