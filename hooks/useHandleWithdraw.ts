import { ethers } from 'ethers';

import abiLibrary from 'lib/abi';

import { ckbToShannons } from 'utils/formatShannons';

const daoAddress = process.env.DAO_ADDRESS || '';
const tributeToken = process.env.TRIBUTE_TOKEN_ADDRESS || '';

const useHandleWithdraw = async (provider: any, amount: number) => {
  const signer = provider.getSigner();
  const dao = await new ethers.Contract(daoAddress, abiLibrary.moloch2, signer);
  const token = await new ethers.Contract(tributeToken, abiLibrary.erc20, signer);

  await token.approve(daoAddress, amount);

  const tx = await dao.withdrawBalance(tributeToken, ckbToShannons(amount));

  const receipt = await tx.wait();

  return receipt;
};

export default useHandleWithdraw;
