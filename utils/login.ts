import Web3 from 'web3';

export const loadWeb3 = async () => {
  if ((window as any).web3) {
    (window as any).web3 = new Web3((window as any).ethereum);
    (window as any).ethereum.on('chainChanged', () => {
      window.location.href = '/';
    });
    (window as any).ethereum.on('accountsChanged', () => {
      window.location.href = '/';
    });
  } else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
};

export const getMetamaskAddress = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    if ((window as any).ethereum) {
      (window as any).web3 = new Web3((window as any).ethereum);
      const accounts = await (window as any).ethereum.request({
        method: 'eth_requestAccounts',
      });

      return accounts ? accounts[0] : null;
    }
  } catch (err) {
    throw err;
  }
  return null;
};
