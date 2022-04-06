import { FC, ReactElement } from 'react';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Close from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  title?: string | ReactElement;
  children: ReactElement;
  className?: string;
  divider?: boolean;
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

const BlurryStyledDialog = {
  backdropFilter: 'blur(1px)',
};

const StyledIcon = styled(Close)`
  color: ${({ theme }) => theme.palette.colors.main6};
  cursor: pointer;
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

const Divider = styled(Box)`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.palette.colors.main5};
`;

const Modal: FC<ModalProps> = ({ className, isOpen, handleClose, title, divider, children }) => {
  return (
    <StyledDialog
      open={isOpen}
      onClose={handleClose}
      className={className}
      BackdropProps={{
        style: BlurryStyledDialog,
      }}
    >
      {title && (
        <StyledHeader>
          <Box>
            <Typography variant="h5">{title}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <StyledIcon onClick={handleClose} />
          </Box>
        </StyledHeader>
      )}

      {divider && <Divider />}

      <StyledBody>{children}</StyledBody>
    </StyledDialog>
  );
};

export default Modal;
