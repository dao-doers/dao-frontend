import { createSlice } from '@reduxjs/toolkit';

import PROCESSING_STATUSES from 'enums/processingStatuses';

interface ModalTransactionProps {
  isOpen: boolean;
  status?: PROCESSING_STATUSES;
  message: string;
}

interface StateProps {
  modalTransaction: ModalTransactionProps;
}

const initialState = {
  isOpen: false,
  status: PROCESSING_STATUSES.IDLE,
  message: '',
};

const modalTransactionSlice = createSlice({
  name: 'modalTransaction',
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setClose: () => initialState,
  },
});

export const selectOpen = (state: StateProps) => state.modalTransaction.isOpen;
export const selectStatus = (state: StateProps) => state.modalTransaction.status;
export const selectMessage = (state: StateProps) => state.modalTransaction.message;

export const { setOpen, setStatus, setMessage, setClose } = modalTransactionSlice.actions;

export default modalTransactionSlice.reducer;
