import { ethers } from 'ethers';

import abiLibrary from 'lib/abi';

import { ckbToShannons } from 'utils/formatShannons';

const tributeToken = process.env.TRIBUTE_TOKEN_ADDRESS || '';

const useHandleTransferERC20 = async (provider: any, receiverAddress: string, amount: number) => {
  const signer = provider.getSigner();
  const token = await new ethers.Contract(tributeToken, abiLibrary.erc20, signer);

  const tx = await token.transfer(receiverAddress, ckbToShannons(amount), {
    gasLimit: 100000,
  });

  const receipt = await tx.wait();
  return receipt;
};

export default useHandleTransferERC20;
