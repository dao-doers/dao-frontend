import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Modal from 'components/Modal/Modal';
import DAOTile from 'components/DAOTile/DAOTile';
import DAOButton from 'components/DAOButton/DAOButton';

import { getMetamaskAddress } from 'utils/blockchain';

import useCheckProvider from 'hooks/useCheckProvider';

import {
  selectWalletsModalOpen,
  setWalletsModalOpen,
  setUserAddress,
  setIsLoggedIn,
  getUsersList,
} from 'redux/slices/user';

const StyledBox = styled(Box)`
  width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
  }
`;

const TypographyBold = styled(Typography)`
  font-weight: 500;
  white-space: nowrap;
  margin-left: 10px;
  ${({ theme }) => theme.breakpoints.down('lg')} {
    display: none;
  }
`;

const WalletsModal: FC = () => {
  const dispatch = useDispatch();

  const isModalOpen = useSelector(selectWalletsModalOpen);

  const hasProvider = useCheckProvider();

  const dAppLink = process.env.APP_URL;

  const handleModalOpen = () => {
    dispatch(setWalletsModalOpen(false));
  };

  const handleConnectMetamask = async () => {
    const address = await getMetamaskAddress();
    sessionStorage.setItem('dao-user-address', address);

    dispatch(setUserAddress(address));
    dispatch(setIsLoggedIn(true));

    dispatch(getUsersList());
    dispatch(setWalletsModalOpen(false));
  };

  return (
    <Modal isOpen={isModalOpen} handleClose={handleModalOpen}>
      <StyledBox>
        <Typography variant="h4" mb={3}>
          Select Wallet
        </Typography>
        <DAOTile variant="greyShadow">
          {hasProvider ? (
            <DAOButton variant="gradientOutline" onClick={handleConnectMetamask}>
              <Box display="flex" alignItems="center" minWidth={20}>
                <Image src="/logos/metamask.png" alt="header-logo" height="20" width="20" />
                <TypographyBold>MetaMask</TypographyBold>
              </Box>
            </DAOButton>
          ) : (
            <DAOButton href={`https://metamask.app.link/dapp/${dAppLink}`} variant="gradientOutline">
              <Box display="flex" alignItems="center" minWidth={20}>
                <Image src="/logos/metamask.png" alt="header-logo" height="20" width="20" />
                <TypographyBold>MetaMask</TypographyBold>
              </Box>
            </DAOButton>
          )}
        </DAOTile>
      </StyledBox>
    </Modal>
  );
};

export default WalletsModal;
