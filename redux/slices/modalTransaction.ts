import { createSlice } from '@reduxjs/toolkit';

import PROCESSING_STATUSES from 'enums/processingStatuses';

interface ModalTransactionProps {
  isOpen: boolean;
  status?:
    | PROCESSING_STATUSES.ERROR
    | PROCESSING_STATUSES.PROCESSING
    | PROCESSING_STATUSES.SUCCESS
    | PROCESSING_STATUSES.IDLE;
}

interface StateProps {
  modalTransaction: ModalTransactionProps;
}

const initialState = {
  isOpen: false,
  status: PROCESSING_STATUSES.IDLE,
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
    setClose: () => initialState,
  },
});

export const selectOpen = (state: StateProps) => state.modalTransaction.isOpen;
export const selectStatus = (state: StateProps) => state.modalTransaction.status;

export const { setOpen, setClose, setStatus } = modalTransactionSlice.actions;

export default modalTransactionSlice.reducer;
