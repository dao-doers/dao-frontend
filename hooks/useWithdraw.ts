import { ethers } from 'ethers';

import abiLibrary from 'lib/abi';

const daoAddress = process.env.DAO_ADDRESS || '';
const tributeToken = process.env.TRIBUTE_TOKEN_ADDRESS || '';

const useWithdraw = async (provider: any, amount: number) => {
  const signer = provider.getSigner();
  const dao = await new ethers.Contract(daoAddress, abiLibrary.moloch2, signer);

  const tx = await dao.withdrawBalance(tributeToken, amount);

  const receipt = await tx.wait();

  return receipt;
};

export default useWithdraw;
