import Web3 from 'web3';

// Validation utils
const isAddress = async (address: string) => {
  const web3 = await new Web3((window as any).web3.currentProvider);
  return web3.utils.isAddress(address);
};

export default isAddress;
