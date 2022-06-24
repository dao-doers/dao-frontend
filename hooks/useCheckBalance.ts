import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ethers } from 'ethers';

import { selectProvider, selectChainId } from 'redux/slices/main';
import {
  selectUserAddress,
  selectIsLoggedIn,
  setDckbBalance,
  setDckbBalanceInDao,
  setGuildDckbBalance,
  setDaoTotalShares,
} from 'redux/slices/user';

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
      const token = await DCKBToken(provider, chainId);
      const dao = await MolochV2(provider, chainId);

      if (dao && token) {
        const userDckbBalanceInDao = await dao.userTokenBalances(userAddress, token.address);

        dispatch(setDckbBalanceInDao(userDckbBalanceInDao));

        const guildAddress = await dao.GUILD();
        const guildDckbBalance = await dao.userTokenBalances(guildAddress, token.address);

        dispatch(setGuildDckbBalance(guildDckbBalance));
        dispatch(setDaoTotalShares(await dao.totalShares()));
      }

      if (isLoggedIn && token) {
        const balance = await (token as ethers.Contract).balanceOf(userAddress);
        if (balance) {
          dispatch(setDckbBalance(balance));
        }
        setChecked(true);
      }
    };

    fetchCkbBalance();
  }, [isLoggedIn, userAddress]);

  return { isChecked };
};

export default useCheckBalance;
