import { createSlice } from '@reduxjs/toolkit';

interface ModaldCkbTransferBProps {
  isOpen: boolean;
}

interface StateProps {
  modaldCkbTransfer: ModaldCkbTransferBProps;
}

const initialState = {
  isOpen: false,
};

const modaldCkbTransferSlice = createSlice({
  name: 'modaldCkbTransfer',
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setClose: () => initialState,
  },
});

export const selectOpen = (state: StateProps) => state.modaldCkbTransfer.isOpen;

export const { setOpen, setClose } = modaldCkbTransferSlice.actions;

export default modaldCkbTransferSlice.reducer;
