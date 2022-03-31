import { createSlice } from '@reduxjs/toolkit';

interface ModalWireddCKBProps {
  isOpen: boolean;
}

interface StateProps {
  modalSUDTTransfer: ModalWireddCKBProps;
}

const initialState = {
  isOpen: false,
};

const modalSUDTTransferSlice = createSlice({
  name: 'modalSUDTTransfer',
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setClose: () => initialState,
  },
});

export const selectOpen = (state: StateProps) => state.modalSUDTTransfer.isOpen;

export const { setOpen, setClose } = modalSUDTTransferSlice.actions;

export default modalSUDTTransferSlice.reducer;
