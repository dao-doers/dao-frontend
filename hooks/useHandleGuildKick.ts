// TODO: we gonna need that in future - not tested
import { ethers } from 'ethers';

import abiLibrary from 'lib/abi';

const daoAddress = process.env.DAO_ADDRESS || '';

const useHandleGuildKick = async (provider: any, memberToKick: number, details: string) => {
  const signer = provider.getSigner();
  const dao = await new ethers.Contract(daoAddress, abiLibrary.moloch2, signer);

  const tx = await dao.submitGuildKickProposal(memberToKick, details);

  const receipt = await tx.wait();
  return receipt;
};

export default useHandleGuildKick;
