import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ethers } from 'ethers';

import { selectProvider, selectChainId } from 'redux/slices/main';
import { selectUserAddress, selectIsLoggedIn, setdckbBalance } from 'redux/slices/user';

import { DCKBToken } from 'utils/contracts';

const useCheckBalance = () => {
  const dispatch = useDispatch();

  const provider = useSelector(selectProvider);
  const chainId = useSelector(selectChainId);
  const userAddress = useSelector(selectUserAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    const fetchCkbBalance = async () => {
      const token = await DCKBToken(provider, chainId);

      if (isLoggedIn) {
        const balance = await (token as ethers.Contract).balanceOf(userAddress);
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
