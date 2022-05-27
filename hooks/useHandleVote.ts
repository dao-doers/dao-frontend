import { ethers } from 'ethers';

import { MolochV2 } from 'utils/contracts';

const useHandleVote = async (provider: any, proposalId: string, voteValue: number, chainId: string) => {
  const signer = provider.getSigner();
  const dao = await MolochV2(signer, chainId);

  const tx = await (dao as ethers.Contract).submitVote(proposalId, voteValue);

  const receipt = await tx.wait();
  return receipt;
};

export default useHandleVote;
