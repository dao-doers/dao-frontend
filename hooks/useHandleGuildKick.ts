import { ethers } from 'ethers';

import { MolochV2 } from 'utils/contracts';

const useHandleGuildKick = async (
  provider: any,
  memberToKick: number,
  details: { title: string; description: string; link: string },
  chainId: string,
) => {
  const signer = provider.getSigner();
  const dao = await MolochV2(signer, chainId);

  const tx = await (dao as ethers.Contract).submitGuildKickProposal(
    memberToKick,
    `{"title": "${details.title}", "description": "${details.description}", "link": "${details.link}"}`,
  );

  const receipt = await tx.wait();
  return receipt;
};

export default useHandleGuildKick;
