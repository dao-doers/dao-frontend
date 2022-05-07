import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import detectEthereumProvider from '@metamask/detect-provider';

import { getMetamaskAddress } from 'utils/blockchain';

import { selectessionMaintained, setUserAddress, setIsLoggedIn, setSessionMaintained } from 'redux/slices/user';

const useMaintainSession = async () => {
  const dispatch = useDispatch();

  const sessionMaintained = useSelector(selectessionMaintained);

  const [hasProvider, setProvider] = useState(false);

  useEffect(() => {
    const checkProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        setProvider(true);
      }
    };
    checkProvider();
  }, []);

  const checkAddresses = async () => {
    const metamaskUserAddress = await getMetamaskAddress();
    const sessionUserAddress = sessionStorage.getItem('dao-user-address');

    if (metamaskUserAddress === sessionUserAddress && sessionMaintained === false) {
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
