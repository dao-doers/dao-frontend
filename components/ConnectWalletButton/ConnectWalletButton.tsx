import { FC } from 'react';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DAOButton from 'components/DAOButton/DAOButton';

import { setWalletsModalOpen } from 'redux/slices/user';

const TypographyBold = styled(Typography)`
  font-weight: 500;
  white-space: nowrap;
  ${({ theme }) => theme.breakpoints.down('lg')} {
    display: none;
  }
`;

const ConnectWalletButton: FC = () => {
  const dispatch = useDispatch();

  const handleClick = async () => {
    dispatch(setWalletsModalOpen(true));
  };

  return (
    <DAOButton variant="gradientOutline" onClick={handleClick}>
      <Box display="flex" alignItems="center" minWidth={20}>
        <TypographyBold>Connect Wallet</TypographyBold>
      </Box>
    </DAOButton>
  );
};

export default ConnectWalletButton;
