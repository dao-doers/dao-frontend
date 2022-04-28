import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ethers } from 'ethers';

import abiLibrary from 'lib/abi';

import { selectUserAddress, selectIsLoggedIn, setdckbBalance } from 'redux/slices/user';

const daoAddress = process.env.DAO_ADDRESS || '';

const useCheckBalance = () => {
  const dispatch = useDispatch();

  const userAddress = useSelector(selectUserAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [isChecked, setChecked] = useState(false);
  const [provider, setProvider] = useState(new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL || ''));

  useEffect(() => {
    const fetchCkbBalance = async () => {
      if (window.ethereum) {
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        setProvider(new ethers.providers.Web3Provider(window.ethereum as any));
      }

      const dao = await new ethers.Contract(daoAddress, abiLibrary.moloch2, provider);

      const contractTokenAddress = await dao.depositToken();
      const token = new ethers.Contract(contractTokenAddress, abiLibrary.erc20, provider);

      if (isLoggedIn) {
        const balance = await token.balanceOf(userAddress);
        if (balance) {
          // eslint-disable-next-line no-underscore-dangle
          dispatch(setdckbBalance(balance._hex));
        }
        setChecked(true);
      }
    };

    fetchCkbBalance();
  }, [isLoggedIn, userAddress]);

  return { isChecked };
};

export default useCheckBalance;
