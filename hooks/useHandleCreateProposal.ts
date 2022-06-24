import { ethers, providers, BigNumber } from 'ethers';

import { DCKBToken, MolochV2 } from 'utils/contracts';

import DCKBTokenJSON from 'lib/DCKBToken.json';
import MolochV2JSON from 'lib/MolochV2.json';

const useHandleCreateProposal = async (
  provider: providers.JsonRpcProvider,
  proposalCreator: string,
  applicantAddress: string,
  sharesRequested: number,
  lootRequested: number,
  tributeOffered: BigNumber,
  paymentRequested: number,
  details: { title: string; description: string; link: string },
  chainId: string,
) => {
  const sharesRequestedBigNumber = ethers.BigNumber.from(sharesRequested);
  const lootRequestedBigNumber = ethers.BigNumber.from(lootRequested);
  const paymentRequestedBigNumber = ethers.BigNumber.from(paymentRequested);

  const tokenAddress = (DCKBTokenJSON.networks as any)[chainId].address;
  const molochAddress = (MolochV2JSON.networks as any)[chainId].address;

  const signer = provider.getSigner();
  const token = await DCKBToken(signer, chainId);
  const dao = await MolochV2(signer, chainId);

  // TODO: check allowance and approve only necessary amount of tokens
  const existingApproval = await (token as ethers.Contract).allowance(proposalCreator, molochAddress);

  await (token as ethers.Contract).approve(molochAddress, tributeOffered.sub(existingApproval));

  const tx = await (dao as ethers.Contract).submitProposal(
    applicantAddress,
    sharesRequestedBigNumber,
    lootRequestedBigNumber,
    tributeOffered,
    tokenAddress,
    paymentRequestedBigNumber,
    tokenAddress,
    `{"title": "${details.title}", "description": "${details.description}", "link": "${details.link}"}`,
  );

  const receipt = await tx.wait();
  return receipt;
};

export default useHandleCreateProposal;
