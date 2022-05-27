import { ethers } from 'ethers';

import { MolochV2 } from 'utils/contracts';

const useCheckIfVoted = async (provider: any, user: string, proposalIndex: any, chainId: string) => {
  const dao = await MolochV2(provider, chainId);

  const response = await (dao as ethers.Contract).getMemberProposalVote(user, proposalIndex);
  return response === 0 || response === '0';
};

export default useCheckIfVoted;
