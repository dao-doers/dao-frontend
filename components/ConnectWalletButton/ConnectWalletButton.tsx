import { FC } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';

import DAOButton from 'components/DAOButton/DAOButton';

import { setUserAddress } from 'redux/slices/user';

import { loadWeb3, getMetamaskAddress } from 'utils/login';
import { useWeb3 } from 'components/providers/';
import { useAccount } from 'components/web3/hooks/useAccount';

const ConnectWalletButton: FC = () => {
  // TODO: different way, to check if it will be fixed
  const { connect, isLoading, isWeb3Loaded } = useWeb3();
  const { account } = useAccount();

  const dispatch = useDispatch();

  // TODO: how to store address after page reload
  const handleConnectWallet = async () => {
    await loadWeb3();

    const address = await getMetamaskAddress();
    dispatch(setUserAddress(address));
  };

  return (
    <DAOButton
      variant="gradientOutline"
      onClick={connect}
      isLoading={isLoading}
      isLoadingText="Loading..."
      disabled={isLoading}
    >
      {isWeb3Loaded ? (
        <Box display="flex" alignItems="center">
          <Image src="/logos/metamask.png" alt="header-logo" height="20" width="20" />
          {account ? 'Hi there' : 'Connect Wallet'}
        </Box>
      ) : (
        <Box display="flex" alignItems="center" onClick={() => window.open('https://metamask.io/', '_blank')}>
          <Image src="/logos/metamask.png" alt="header-logo" height="20" width="20" />
          Install Metamask
        </Box>
      )}
    </DAOButton>
  );
};

export default ConnectWalletButton;
