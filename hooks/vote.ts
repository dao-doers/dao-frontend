import { BigNumber, ethers, ContractReceipt } from 'ethers';
import { Proposal } from 'types/types';

import { MolochV2 } from 'utils/contracts';

export const HANDLE_VOTE_ERRORS = ['Voting period has not started. Please wait.'];

const submitProposalVote = async (
  provider: ethers.providers.JsonRpcProvider,
  proposalId: Proposal['proposalIndex'],
  voteValue: number,
  chainId: string,
): Promise<ContractReceipt> => {
  const signer = provider.getSigner();
  const dao = await MolochV2(signer, chainId);

  if (!dao) {
    throw new Error('submitProposalVote !dao');
  }

  const currentPeriod: BigNumber = await dao.getCurrentPeriod();
  const proposal = await dao.proposals(proposalId);
  const { startingPeriod } = proposal;

  if (!currentPeriod.gte(startingPeriod)) {
    throw new Error(HANDLE_VOTE_ERRORS[0]);
  }

  const tx = await (dao as ethers.Contract).submitVote(proposalId, voteValue);

  return tx.wait();
};

export default submitProposalVote;
