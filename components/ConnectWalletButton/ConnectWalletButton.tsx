import { FC } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DAOButton from 'components/DAOButton/DAOButton';

import { getMetamaskAddress } from 'utils/blockchain';

import useCheckProvider from 'hooks/useCheckProvider';

import { setUserAddress, setIsLoggedIn, getUsersList } from 'redux/slices/user';

const TypographyBold = styled(Typography)`
  font-weight: 600;
  white-space: nowrap;
  ${({ theme }) => theme.breakpoints.down('lg')} {
    display: none;
  }
`;

const ConnectWalletButton: FC = () => {
  const dispatch = useDispatch();

  const hasProvider = useCheckProvider();

  const dAppLink = process.env.APP_URL;

  const handleConnectWallet = async () => {
    const address = await getMetamaskAddress();
    sessionStorage.setItem('dao-user-address', address);

    dispatch(setUserAddress(address));
    dispatch(setIsLoggedIn(true));

    dispatch(getUsersList());
  };

  return hasProvider ? (
    <DAOButton variant="gradientOutline" onClick={handleConnectWallet}>
      <Box display="flex" alignItems="center" minWidth={20}>
        <Image src="/logos/metamask.png" alt="header-logo" height="20" width="20" />
        <TypographyBold>Connect Wallet</TypographyBold>
      </Box>
    </DAOButton>
  ) : (
    <DAOButton href={`https://metamask.app.link/dapp/${dAppLink}`} variant="gradientOutline">
      <Box display="flex" alignItems="center" minWidth={20}>
        <Image src="/logos/metamask.png" alt="header-logo" height="20" width="20" />
        <TypographyBold>Connect Wallet</TypographyBold>
      </Box>
    </DAOButton>
  );
};

export default ConnectWalletButton;
