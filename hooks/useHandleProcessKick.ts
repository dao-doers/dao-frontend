import { ethers } from 'ethers';
import { Proposal } from 'types/types';

import { MolochV2 } from 'utils/contracts';

const useHandleProcessKick = async (provider: any, proposalIndex: Proposal['proposalIndex'], chainId: any) => {
  const signer = provider.getSigner();
  const dao = await MolochV2(signer, chainId);

  const tx = await (dao as ethers.Contract).processGuildKickProposal(proposalIndex);

  const receipt = await tx.wait();
  return receipt;
};

export default useHandleProcessKick;
