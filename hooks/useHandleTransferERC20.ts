import { ethers } from 'ethers';

import { ckbToShannons } from 'utils/formatShannons';

import { DCKBToken } from 'utils/contracts';

const useHandleTransferERC20 = async (provider: any, receiverAddress: string, amount: number, chainId: string) => {
  const signer = provider.getSigner();
  const token = await DCKBToken(signer, chainId);

  // TODO: dont we need approval here? and check that shannons
  const tx = await (token as ethers.Contract).transfer(receiverAddress, ckbToShannons(amount), {
    gasLimit: 100000,
  });

  const receipt = await tx.wait();
  return receipt;
};

export default useHandleTransferERC20;
