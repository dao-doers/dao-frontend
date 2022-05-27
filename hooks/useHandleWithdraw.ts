import { ethers } from 'ethers';

import { ckbToShannons } from 'utils/formatShannons';

import { DCKBToken, MolochV2 } from 'utils/contracts';

import DCKBTokenJSON from 'lib/DCKBToken.json';
import MolochV2JSON from 'lib/MolochV2.json';

const useHandleWithdraw = async (provider: any, amount: string, chainId: string) => {
  const tokenAddress = (DCKBTokenJSON.networks as any)[chainId].address;
  const molochAddress = (MolochV2JSON.networks as any)[chainId].address;

  const signer = provider.getSigner();
  const token = await DCKBToken(signer, chainId);
  const dao = await MolochV2(signer, chainId);

  await (token as ethers.Contract).approve(molochAddress, amount);

  const tx = await (dao as ethers.Contract).withdrawBalance(tokenAddress, ckbToShannons(Number(amount)));

  const receipt = await tx.wait();

  return receipt;
};

export default useHandleWithdraw;
