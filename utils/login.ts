/* eslint-disable consistent-return */
import Web3 from 'web3';
import store from 'redux/store';

import { setUserAddress } from 'redux/slices/user';

export const loadWeb3 = async () => {
  if (window.web3) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.on('chainChanged', () => {
      console.log('chainChanged');
    });
    window.ethereum.on('accountsChanged', () => {
      console.log('accountChanged');
      store.dispatch(setUserAddress(''));
      sessionStorage.removeItem('dao-user-address');
    });
  } else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
};

export const getMetamaskAddress = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      return accounts ? accounts[0] : null;
    }
  } catch (err) {
    throw err;
  }
  return null;
};
