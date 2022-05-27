import { ethers } from 'ethers';

import { DCKBToken, MolochV2 } from 'utils/contracts';

import DCKBTokenJSON from 'lib/DCKBToken.json';
import MolochV2JSON from 'lib/MolochV2.json';

const useHandleCreateProposal = async (
  provider: any,
  proposalCreator: string,
  applicantAddress: string,
  sharesRequested: number,
  lootRequested: number,
  tributeOffered: number,
  paymentRequested: number,
  details: { title: string; description: string; link: string },
  chainId: string,
) => {
  const sharesRequestedBigNumber = ethers.BigNumber.from(sharesRequested);
  const lootRequestedBigNumber = ethers.BigNumber.from(lootRequested);
  // TODO: find out why in aproval metamask we can see 1e-8 dCKB while transaction takes 1dCKB from account
  const tributeOfferedBigNumber = ethers.BigNumber.from(tributeOffered);
  const paymentRequestedBigNumber = ethers.BigNumber.from(paymentRequested);

  const tokenAddress = (DCKBTokenJSON.networks as any)[chainId].address;
  const molochAddress = (MolochV2JSON.networks as any)[chainId].address;

  const signer = provider.getSigner();
  const token = await DCKBToken(signer, chainId);
  const dao = await MolochV2(signer, chainId);

  // TODO: check allowance and approve only necessary amount of tokens
  const existingApproval = await (token as ethers.Contract).allowance(proposalCreator, molochAddress);

  await (token as ethers.Contract).approve(
    molochAddress,
    // TODO: check that calc
    ethers.BigNumber.from(tributeOffered - Number(existingApproval)),
  );

  const tx = await (dao as ethers.Contract).submitProposal(
    applicantAddress,
    sharesRequestedBigNumber,
    lootRequestedBigNumber,
    tributeOfferedBigNumber,
    tokenAddress,
    paymentRequestedBigNumber,
    tokenAddress,
    `{"title": "${details.title}", "description": "${details.description}", "link": "${details.link}"}`,
  );

  const receipt = await tx.wait();
  return receipt;
};

export default useHandleCreateProposal;
