import { ethers } from 'ethers';
import { useSelector } from 'react-redux';

import abiLibrary from 'lib/abi';

import { selectProvider } from 'redux/slices/main';

const daoAddress = process.env.DAO_ADDRESS || '';
const tributeToken = process.env.TRIBUTE_TOKEN_ADDRESS || '';

const useTestFunction = async () => {
  const provider = useSelector(selectProvider);

  const signer = provider.getSigner();
  const dao = await new ethers.Contract(daoAddress, abiLibrary.moloch2, signer);
  const token = await new ethers.Contract(tributeToken, abiLibrary.erc20, signer);

  const receipt = await dao.getUserTokenBalance(
    '0x000000000000000000000000000000000000babe',
    '0x884541623C1B26A926a5320615F117113765fF81',
  );

  // const receipt = await tx.wait();
  console.log(receipt);

  return receipt;
};

export default useTestFunction;
