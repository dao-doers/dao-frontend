import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';

import DAOButton from 'components/DAOButton/DAOButton';

import { setUserAddress } from 'redux/slices/user';

import { loadWeb3, getMetamaskAddress } from 'utils/login';
import { useWeb3 } from 'context/MetamaskProvider';
import Web3 from 'web3';
import formatAddress from 'utils/formatAddress';

const ConnectWalletButton: FC = () => {
  const { connect, isLoading, requireInstall } = useWeb3();
  const dispatch = useDispatch();
  const [address, setAddress] = useState<string | null>();
  // TODO: avoid having to log in after refreshing the page
  const handleConnectWallet = async () => {
    await loadWeb3();

    const addressv2 = await getMetamaskAddress();
    dispatch(setUserAddress(addressv2));
  };

  /* 
  Testing 
  */
  if (typeof window !== 'undefined') {
    const { ethereum } = window;
    const web3 = new Web3(ethereum);
    let ethAccount: any;

    const getAccount = async () => {
      ethAccount = await web3.eth.getAccounts();
      if (ethAccount[0]) {
        setAddress(ethAccount[0]);
      } else {
        setAddress(null);
      }
    };
    getAccount();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      ethereum && ethereum.on('accountsChanged', (accounts: any[]) => setAddress(accounts[0] ?? null));
    }, []);
  }
  return (
    <DAOButton variant="gradientOutline" onClick={connect} isLoading={isLoading} disabled={isLoading}>
      {requireInstall ? (
        <Box display="flex" alignItems="center">
          {address ? formatAddress(String(address)) : 'Connect Wallet'}
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
