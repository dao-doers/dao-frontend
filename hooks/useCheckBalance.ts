import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Web3 from 'web3';

import abiLibrary from 'lib/abi';

import { selectUserAddress, selectIsLoggedIn, setdckbBalance } from 'redux/slices/user';

const daoAddress = process.env.DAO_ADDRESS || '';

const getDao = async (address: string) => {
  const dao = await new web3.eth.Contract(abiLibrary.moloch2, address);
  return dao;
};

const useCheckBalance = () => {
  const dispatch = useDispatch();

  const userAddress = useSelector(selectUserAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    const fetchCkbBalance = async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        window.web3 = new Web3(window.ethereum);
      } else {
        window.web3 = new Web3(process.env.PROVIDER_URL || '');
      }

      const dao = await getDao(daoAddress);

      const token = new web3.eth.Contract(abiLibrary.erc20, await dao.methods.depositToken().call());

      if (isLoggedIn) {
        const balance = await token.methods.balanceOf(userAddress).call();
        if (balance) {
          dispatch(setdckbBalance(balance));
        }
        setChecked(true);
      }
    };

    fetchCkbBalance();
  }, [isLoggedIn, userAddress]);

  return { isChecked };
};

export default useCheckBalance;
