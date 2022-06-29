import { BigNumber, ethers } from 'ethers';

import { MolochV2 } from 'utils/contracts';

export const HANDLE_VOTE_ERRORS = ['Voting period has not started. Please wait.'];

const useHandleVote = async (provider: any, proposalId: string, voteValue: number, chainId: string) => {
  const signer = provider.getSigner();
  const dao = await MolochV2(signer, chainId);

  if (!dao) {
    throw new Error('useHandleVote !dao');
  }

  const currentPeriod: BigNumber = await dao.getCurrentPeriod();
  const proposal = await dao.proposals(proposalId);
  const { startingPeriod } = proposal;

  if (!currentPeriod.gte(startingPeriod)) {
    throw new Error(HANDLE_VOTE_ERRORS[0]);
  }

  const tx = await (dao as ethers.Contract).submitVote(proposalId, voteValue);

  const receipt = await tx.wait();
  return receipt;
};

export default useHandleVote;
