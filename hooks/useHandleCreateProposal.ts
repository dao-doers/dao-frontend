import { ethers } from 'ethers';

import abiLibrary from 'lib/abi';

const daoAddress = process.env.DAO_ADDRESS || '';
const tributeToken = process.env.TRIBUTE_TOKEN_ADDRESS || '';
const paymentToken = process.env.TRIBUTE_TOKEN_ADDRESS || '';

const useHandleCreateProposal = async (
  provider: any,
  proposalCreator: string,
  applicantAddress: string,
  sharesRequested: number,
  lootRequested: number,
  tributeOffered: number,
  paymentRequested: number,
  details: { title: string; description: string; link: string },
) => {
  const sharesRequestedBigNumber = ethers.BigNumber.from(sharesRequested);
  const lootRequestedBigNumber = ethers.BigNumber.from(lootRequested);
  // TODO: find out why in aproval metamask we can see 1e-8 dCKB while transaction takes 1dCKB from account
  const tributeOfferedBigNumber = ethers.BigNumber.from(tributeOffered);
  const paymentRequestedBigNumber = ethers.BigNumber.from(paymentRequested);

  const signer = provider.getSigner();
  const dao = await new ethers.Contract(daoAddress, abiLibrary.moloch2, signer);
  const token = await new ethers.Contract(tributeToken, abiLibrary.erc20, signer);

  // TODO: check if there is existing approval in case if proposalCreator approved first MM request and rejected second
  console.log('token whitelist', {
    a: await dao.tokenWhitelist(tributeToken),
    daoAddress,
    existingApproval: await token.allowance(proposalCreator, daoAddress),
  });

  await token.approve(daoAddress, tributeOfferedBigNumber);

  console.log('token whitelist 2', {
    a: await dao.tokenWhitelist(tributeToken),
    daoAddress,
    existingApproval: await token.allowance(proposalCreator, daoAddress),
  });

  const tx = await dao.submitProposal(
    applicantAddress,
    sharesRequestedBigNumber,
    lootRequestedBigNumber,
    tributeOfferedBigNumber,
    tributeToken,
    paymentRequestedBigNumber,
    paymentToken,
    `{"title": "${details.title}", "description": "${details.description}", "link": "${details.link}"}`,
  );

  console.log(tx);
  const receipt = await tx.wait();
  console.log(receipt);
  return receipt;
};

export default useHandleCreateProposal;
