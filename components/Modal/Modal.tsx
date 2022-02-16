import { FC, ReactElement } from 'react';

import styled from '@emotion/styled';

import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  children: ReactElement;
  className?: string;
  hideOverlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
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

const Modal: FC<ModalProps> = ({
  className,
  isOpen,
  handleClose,
  hideOverlay = false,
  overlayColor = '#000000',
  overlayOpacity = 0.5,
  children,
}) => {
  function hexToRgb(hex: string): any {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      };
    }
    return {};
  }

  let rgbOverlayColor: any = {};
  if (overlayColor) {
    rgbOverlayColor = hexToRgb(overlayColor);
  }
  return (
    <StyledDialog
      open={isOpen}
      onClose={handleClose}
      className={className}
      style={
        !hideOverlay
          ? {
              backgroundColor: `rgba(
      ${rgbOverlayColor?.r},
      ${rgbOverlayColor?.g},
      ${rgbOverlayColor?.b},
      ${overlayOpacity}
    )`,
            }
          : {}
      }
    >
      <Box p={3}>{children}</Box>
    </StyledDialog>
  );
};

export default Modal;
