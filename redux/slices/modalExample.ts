import { createSlice } from '@reduxjs/toolkit';

interface ModalExampleProps {
  isOpen: boolean;
}

interface StateProps {
  modalExample: ModalExampleProps;
}

const modalExampleSlice = createSlice({
  name: 'modalExample',
  initialState: {
    isOpen: false,
  },
  reducers: {
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const selectOpen = (state: StateProps) => state.modalExample.isOpen;

export const { setOpen } = modalExampleSlice.actions;

export default modalExampleSlice.reducer;
