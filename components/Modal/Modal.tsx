import { FC, ReactElement } from 'react';

import styled from '@emotion/styled';

import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  children: ReactElement;
  className?: string;
}

const StyledDialog = styled(Dialog)`
  & .MuiDialog-root {
    z-index: 30;
  }

  & .MuiDialog-paper {
    border-radius: 20px;
    margin: 0;
    background-color: ${({ theme }) => theme.palette.background.default};
    border: 1px solid ${({ theme }) => theme.palette.colors.main4};
  }

  & .MuiPaper-root {
    box-shadow: 0 0 50px -45px ${({ theme }) => theme.palette.text.primary};
  }
`;

const Modal: FC<ModalProps> = ({ className, isOpen, handleClose, children }) => {
  return (
    <StyledDialog open={isOpen} onClose={handleClose} className={className}>
      <Box p={3}>{children}</Box>
    </StyledDialog>
  );
};

export default Modal;
