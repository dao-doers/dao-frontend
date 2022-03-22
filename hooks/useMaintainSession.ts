import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import detectEthereumProvider from '@metamask/detect-provider';

import { loadWeb3, getMetamaskAddress } from 'utils/blockchain';

import { selectessionMaintained, setUserAddress, setIsLoggedIn, setSessionMaintained } from 'redux/slices/user';

const useMaintainSession = async () => {
  const dispatch = useDispatch();

  const sessionMaintained = useSelector(selectessionMaintained);

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

    if (metamaskUserAddress === sessionUserAddress && !sessionMaintained) {
      dispatch(setUserAddress(metamaskUserAddress));
      dispatch(setIsLoggedIn(true));
      dispatch(setSessionMaintained(true));
    }
  };

  if (hasProvider) {
    checkAddresses();
  }
};

export default useMaintainSession;
