import { ethers } from 'ethers';
import BigNumber from 'bignumber.js/bignumber';

import abiLibrary from 'lib/abi';

const daoAddress = process.env.DAO_ADDRESS || '';
const tributeToken = process.env.TRIBUTE_TOKEN_ADDRESS || '';

const useHandleSponsorProposal = async (provider: any, proposalId: string) => {
  const signer = provider.getSigner();
  const dao = await new ethers.Contract(daoAddress, abiLibrary.moloch2, signer);
  const token = await new ethers.Contract(tributeToken, abiLibrary.erc20, signer);

  const proposalDeposit = await dao.proposalDeposit();

  await token.approve(daoAddress, proposalDeposit);

  const tx = await dao.sponsorProposal(proposalId);

  const receipt = await tx.wait();
  return receipt;
};

export default useHandleSponsorProposal;
