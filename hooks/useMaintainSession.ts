import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setUserAddress, setIsLoggedIn } from 'redux/slices/user';

import { loadWeb3, getMetamaskAddress } from 'utils/blockchain';

import detectEthereumProvider from '@metamask/detect-provider';

const useMaintainSession = async () => {
  const dispatch = useDispatch();

  const [hasProvider, setHasProvider] = useState(false);

  useEffect(() => {
    const setProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        setHasProvider(true);
      }
    };
    setProvider();
  }, []);

  const checkAddresses = async () => {
    await loadWeb3();

    const metamaskUserAddress = await getMetamaskAddress();
    const sessionUserAddress = sessionStorage.getItem('dao-user-address');

    if (metamaskUserAddress === sessionUserAddress) {
      dispatch(setUserAddress(metamaskUserAddress));
      dispatch(setIsLoggedIn(true));
    }
  };

  if (hasProvider) {
    checkAddresses();
  }
};

export default useMaintainSession;
