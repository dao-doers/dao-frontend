import abiLibrary from 'lib/abi';

import Web3 from 'web3';

const web3 = new Web3(process.env.PROVIDER_URL || '');

const daoAddress = process.env.DAO_ADDRESS || '';

const getDao = async (address: string) => {
  const dao = await new web3.eth.Contract(abiLibrary.moloch2, address);
  return dao;
};

const useTestFunction = async () => {
  const dao = await getDao(daoAddress);

  const token = new web3.eth.Contract(abiLibrary.erc20, '0x884541623C1B26A926a5320615F117113765fF81');

  const receipe = await dao.methods
    .getUserTokenBalance('0x000000000000000000000000000000000000babe', '0x884541623C1B26A926a5320615F117113765fF81')
    .call();
  console.log(receipe);
};

export default useTestFunction;
