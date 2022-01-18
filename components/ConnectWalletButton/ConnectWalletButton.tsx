import { FC } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';

import DAOButton from 'components/DAOButton/DAOButton';

import { setUserAddress } from 'redux/slices/user';

import { loadWeb3, getMetamaskAddress } from 'utils/login';
import { useWeb3 } from 'context/MetamaskProvider';

const ConnectWalletButton: FC = () => {
  const { connect } = useWeb3();
  const dispatch = useDispatch();

  // TODO: avoid having to log in after refreshing the page
  const handleConnectWallet = async () => {
    await loadWeb3();

    const address = await getMetamaskAddress();
    dispatch(setUserAddress(address));
  };

  return (
    <DAOButton variant="gradientOutline" onClick={connect}>
      <Box display="flex" alignItems="center">
        <Image src="/logos/metamask.png" alt="header-logo" height="20" width="20" />
        Connect Wallet
      </Box>
    </DAOButton>
  );
};

export default ConnectWalletButton;
