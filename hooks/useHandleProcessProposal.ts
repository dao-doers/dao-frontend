import { ethers } from 'ethers';

import { MolochV2 } from 'utils/contracts';

const useHandleProcessProposal = async (provider: any, proposalIndex: string, chainId: string) => {
  const signer = provider.getSigner();
  const dao = await MolochV2(signer, chainId);

  const tx = await (dao as ethers.Contract).processProposal(proposalIndex);

  const receipt = await tx.wait();
  return receipt;
};

export default useHandleProcessProposal;
