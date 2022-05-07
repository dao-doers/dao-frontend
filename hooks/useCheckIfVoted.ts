import { ethers } from 'ethers';

import abiLibrary from 'lib/abi';

const useCheckIfVoted = async (provider: any, user: string, proposalIndex: any, daoAddress: string) => {
  const dao = await new ethers.Contract(daoAddress, abiLibrary.moloch2, provider);

  const response = await dao.getMemberProposalVote(user, proposalIndex);
  return response === 0 || response === '0';
};

export default useCheckIfVoted;
