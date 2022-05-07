import { ethers } from 'ethers';

import abiLibrary from 'lib/abi';

const daoAddress = process.env.DAO_ADDRESS || '';

const useHandleVote = async (provider: any, proposalId: string, voteValue: number) => {
  const signer = provider.getSigner();
  const dao = await new ethers.Contract(daoAddress, abiLibrary.moloch2, signer);

  const tx = await dao.submitVote(proposalId, voteValue);

  const receipt = await tx.wait();
  return receipt;
};

export default useHandleVote;
