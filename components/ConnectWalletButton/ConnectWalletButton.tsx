import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';

import DAOButton from 'components/DAOButton/DAOButton';

import { setUserAddress } from 'redux/slices/user';

import { loadWeb3, getMetamaskAddress } from 'utils/login';

import useMobileDetect from 'hooks/useMobileDetection';
import detectEthereumProvider from '@metamask/detect-provider';

const ConnectWalletButton: FC = () => {
  const dispatch = useDispatch();
  const { isMobile } = useMobileDetect();

  const [hasProvider, setHasProvider] = useState(false);

  const dAppLink = process.env.APP_URL;

  const handleConnectWallet = async () => {
    await loadWeb3();

    const address = await getMetamaskAddress();
    sessionStorage.setItem('dao-user-address', address);

    dispatch(setUserAddress(address));
  };

  useEffect(() => {
    const setProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        setHasProvider(true);
      }
    };
    setProvider();
  }, []);

  return hasProvider || (!isMobile() && !hasProvider) ? (
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
        Connect Wallet Mobile
      </Box>
    </DAOButton>
  );
};

export default ConnectWalletButton;
