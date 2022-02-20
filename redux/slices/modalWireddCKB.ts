import { createSlice } from '@reduxjs/toolkit';

interface ModalWireddCKBProps {
  isOpen: boolean;
}

interface StateProps {
  modalWireddCKB: ModalWireddCKBProps;
}

const initialState = {
  isOpen: false,
};

const modalWireddCKBSlice = createSlice({
  name: 'modalWireddCKB',
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setClose: () => initialState,
  },
});

export const selectOpen = (state: StateProps) => state.modalWireddCKB.isOpen;

export const { setOpen, setClose } = modalWireddCKBSlice.actions;

export default modalWireddCKBSlice.reducer;
