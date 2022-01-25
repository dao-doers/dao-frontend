import { useDispatch } from 'react-redux';

import { setUserAddress } from 'redux/slices/user';

import { loadWeb3, getMetamaskAddress } from 'utils/login';

const useMaintainSession = async () => {
  const dispatch = useDispatch();

  const checkAddresses = async () => {
    await loadWeb3();

    const metamaskUserAddress = await getMetamaskAddress();
    const sessionUserAddress = sessionStorage.getItem('dao-user-address');

    if (metamaskUserAddress === sessionUserAddress) {
      dispatch(setUserAddress(metamaskUserAddress));
    }
  };
  checkAddresses();
};

export default useMaintainSession;
