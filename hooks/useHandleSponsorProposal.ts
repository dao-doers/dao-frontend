import { ethers } from 'ethers';

import { DCKBToken, MolochV2 } from 'utils/contracts';

import MolochV2JSON from 'lib/MolochV2.json';

const useHandleSponsorProposal = async (provider: any, proposalId: string, userAddress: string, chainId: string) => {
  const molochAddress = (MolochV2JSON.networks as any)[chainId].address;

  const signer = provider.getSigner();
  const token = await DCKBToken(signer, chainId);
  const dao = await MolochV2(signer, chainId);

  const proposalDeposit = await (dao as ethers.Contract).proposalDeposit();

  // TODO: check allowance and approve only necessary amount of tokens
  const existingApproval = await (token as ethers.Contract).allowance(userAddress, molochAddress);

  await (token as ethers.Contract).approve(
    molochAddress,
    // TODO: check that calc
    // ethers.BigNumber.from(Number(proposalDeposit) - Number(existingApproval)),
    ethers.BigNumber.from(proposalDeposit),
  );

  const tx = await (dao as ethers.Contract).sponsorProposal(proposalId);

  const receipt = await tx.wait();
  return receipt;
};

export default useHandleSponsorProposal;
