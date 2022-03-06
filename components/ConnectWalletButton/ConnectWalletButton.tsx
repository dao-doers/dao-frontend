import { FC } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';

import DAOButton from 'components/DAOButton/DAOButton';

import { setUserAddress, setIsLoggedIn } from 'redux/slices/user';

import { loadWeb3, getMetamaskAddress } from 'utils/blockchain';

import useCheckProvider from 'hooks/useCheckProvider';

const ConnectWalletButton: FC = () => {
  const dispatch = useDispatch();

  const hasProvider = useCheckProvider();

  const dAppLink = process.env.APP_URL;

  const handleConnectWallet = async () => {
    await loadWeb3();

    const address = await getMetamaskAddress();
    sessionStorage.setItem('dao-user-address', address);

    dispatch(setUserAddress(address));
    dispatch(setIsLoggedIn(true));
  };

  return hasProvider ? (
    <DAOButton variant="gradientOutline" onClick={handleConnectWallet}>
      <Box display="flex" alignItems="center">
        <Image src="/logos/metamask.png" alt="header-logo" height="20" width="20" />
        Connect Wallet
      </Box>
    </DAOButton>
  ) : (
    <DAOButton href={`https://metamask.app.link/dapp/${dAppLink}`} variant="gradientOutline">
      <Box display="flex" alignItems="center">
        <Image src="/logos/metamask.png" alt="header-logo" height="20" width="20" />
        Connect Wallet
      </Box>
    </DAOButton>
  );
};

export default ConnectWalletButton;
