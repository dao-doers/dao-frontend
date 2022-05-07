import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ethers } from 'ethers';

import abiLibrary from 'lib/abi';

import { selectUserAddress, selectIsLoggedIn, setdckbBalance } from 'redux/slices/user';
import { selectProvider } from 'redux/slices/main';

const daoAddress = process.env.DAO_ADDRESS || '';

const useCheckBalance = () => {
  const dispatch = useDispatch();

  const provider = useSelector(selectProvider);
  const userAddress = useSelector(selectUserAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    const fetchCkbBalance = async () => {
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
