import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ethers } from 'ethers';

import { selectProvider, selectChainId } from 'redux/slices/main';
import { selectUserAddress, selectIsLoggedIn, setPckbBalance, setPckbBalanceInDao } from 'redux/slices/user';

import { DCKBToken, MolochV2 } from 'utils/contracts';

const useCheckBalance = () => {
  const dispatch = useDispatch();

  const provider = useSelector(selectProvider);
  const chainId = useSelector(selectChainId);
  const userAddress = useSelector(selectUserAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    const fetchCkbBalance = async () => {
      if (!chainId) {
        return;
      }

      const token = await DCKBToken(provider, chainId);
      const dao = await MolochV2(provider, chainId);

      if (dao && token && userAddress !== '') {
        const userPckbBalanceInDao = await dao.userTokenBalances(userAddress, token.address);

        dispatch(setPckbBalanceInDao(userPckbBalanceInDao));
      }

      if (isLoggedIn && token) {
        const balance = await (token as ethers.Contract).balanceOf(userAddress);
        if (balance) {
          dispatch(setPckbBalance(balance));
        }
        setChecked(true);
      }
    };

    fetchCkbBalance();
  }, [provider, chainId, isLoggedIn, userAddress]);

  return { isChecked };
};

export default useCheckBalance;
