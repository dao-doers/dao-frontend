import { ethers } from 'ethers';

import abiLibrary from 'lib/abi';

const daoAddress = process.env.DAO_ADDRESS || '';

const useHandleProcessKick = async (provider: any, proposalIndex: string) => {
  const signer = provider.getSigner();
  const dao = await new ethers.Contract(daoAddress, abiLibrary.moloch2, signer);

  const tx = await dao.processGuildKickProposal(proposalIndex);

  const receipt = await tx.wait();
  return receipt;
};

export default useHandleProcessKick;
