import { MolochV2 } from 'utils/contracts';

const useCheckIfVoted = async (provider: any, user: string, proposalIndex: any, chainId: string) => {
  const dao = await MolochV2(provider, chainId);

  if (!dao) {
    throw new Error('useCheckIfVoted::dao is falsy');
  }

  const response = await dao.getMemberProposalVote(user, proposalIndex);
  return response === 0 || response === '0';
};

export default useCheckIfVoted;
