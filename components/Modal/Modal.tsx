import { FC, ReactElement } from 'react';

import styled from '@emotion/styled';

import Close from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  title?: string;
  children: ReactElement;
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

const StyledIcon = styled(Close)`
  color: ${({ theme }) => theme.palette.colors.main6};
  cursor: pointer;
`;

const StyledTypography = styled(Typography)`
  font-weight: 600;
`;

const StyledHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
`;

const StyledBody = styled(Box)`
  padding: 30px;
`;

const Modal: FC<ModalProps> = ({ isOpen, handleClose, title, children }) => {
  return (
    <StyledDialog open={isOpen} onClose={handleClose}>
      <StyledHeader>
        <Box>
          <StyledTypography variant="h5">{title}</StyledTypography>
        </Box>
        <Box display="flex" alignItems="center">
          <StyledIcon onClick={handleClose} />
        </Box>
      </StyledHeader>

      <StyledBody>{children}</StyledBody>
    </StyledDialog>
  );
};

export default Modal;
