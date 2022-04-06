/* eslint-disable consistent-return */
import store from 'redux/store';

import { setUserAddress, setIsLoggedIn, setUserShares } from 'redux/slices/user';

export const loadWeb3 = async () => {
  if (window.web3) {
    window.ethereum.on('chainChanged', () => {
      console.log('chainChanged');
    });
    window.ethereum.on('accountsChanged', () => {
      console.log('accountChanged');
      store.dispatch(setIsLoggedIn(false));
      store.dispatch(setUserAddress(''));
      store.dispatch(setUserShares(0));
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

//base on https://eips.ethereum.org/EIPS/eip-1474#error-codes
//base on https://eips.ethereum.org/EIPS/eip-1193#provider-errors
export const getMetamaskMessageError = error => {
  if ('code' in error) {
    switch (error.code) {
      case 4001:
        return 'The user rejected the request.';
      case 4100:
        return 'The requested method and/or account has not been authorized by the user.';
      case 4200:
        return 'The Provider does not support the requested method.';
      case 4900:
        return 'The Provider is disconnected from all chains.';
      case 4901:
        return 'The Provider is not connected to the requested chain.';
      case -32700:
        return 'Invalid JSON';
      case -32600:
        return 'JSON is not a valid request object';
      case -32601:
        return 'Method does not exist';
      case -32602:
        return 'Invalid method parameters';
      case -32603:
        return 'Internal JSON-RPC error, check token approve before transfer';
      case -32000:
        return 'Missing or invalid parameters';
      case -32001:
        return 'Requested resource not found';
      case -32002:
        return 'Requested resource not available';
      case -32003:
        return 'Transaction creation failed';
      case -32004:
        return 'Method is not implemented';
      case -32005:
        return 'Request exceeds defined limit';
      case -32006:
        return 'Version of JSON-RPC protocol is not supported';
      default:
        return 'Something went wrong';
    }
  }
};
