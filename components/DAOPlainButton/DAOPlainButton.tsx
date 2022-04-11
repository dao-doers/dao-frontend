import React, { FC, forwardRef, ReactNode } from 'react';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';

import DAOCircleLoader from 'components/DAOCircleLoader/DAOCircleLoader';

export interface DAOPlainButtonProps extends ButtonProps {
  children: ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const StyledDAOPlainButton = styled(Button)<DAOPlainButtonProps>`
  width: 100%;
  height: 100%;
  min-width: 0;
  text-transform: none;
  text-decoration: none;
  padding: 2px;
  border-radius: 9px;
  transition: background 250ms ease-in-out;
  color: ${({ theme }) => theme.palette.text.primary};
`;

const DAOPlainButton: FC<DAOPlainButtonProps> = forwardRef((props, ref) => {
  const { children, variant, size, fullWidth, disabled, isLoading, ...rest } = props;

  return (
    <StyledDAOPlainButton variant={variant} size={size} fullWidth={fullWidth} disabled={disabled} {...rest} ref={ref}>
      {isLoading ? (
        <Box display="flex" alignItems="center">
          <Box display="flex" alignItems="center" mr={2}>
            <DAOCircleLoader size={20} />
          </Box>
          Processing...
        </Box>
      ) : (
        children
      )}
    </StyledDAOPlainButton>
  );
});

export default DAOPlainButton;
