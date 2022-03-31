import BigNumber from 'bignumber.js/bignumber';

import abiLibrary from 'lib/abi';

const tributeToken = process.env.TRIBUTE_TOKEN_ADDRESS;

const getDao = async (address: string) => {
  const dao = await new web3.eth.Contract(abiLibrary.moloch2, address);
  return dao;
};

const getReceipt = async (proposal: any, user: string, estimatedGas: number) => {
  let receipt;
  try {
    receipt = await proposal.send({ from: user, gas: estimatedGas }).on('receipt', (receipt: any) => {
      return receipt;
    });
  } catch (err) {
    receipt = err;
  }
  return receipt;
};

const useSponsorProposal = async (user: string, daoAddress: any, proposalId: string) => {
  const dao = await getDao(daoAddress);
  const token = new web3.eth.Contract(abiLibrary.erc20, tributeToken);

  const userBalance = new BigNumber(await token.methods.balanceOf(user).call());
  const allowance = new BigNumber(await token.methods.allowance(user, daoAddress).call());
  const proposalDeposit = new BigNumber(await dao.methods.proposalDeposit().call());

  // console.log('Not enough funds to pay for proposalDeposit.');
  // throw new Error('Not enough funds to pay for proposalDeposit.');

  if (userBalance.lt(proposalDeposit)) {
    throw new Error('Not enough funds to pay for proposalDeposit.');
  }
  console.log('test');

  // if (allowance.lt(proposalDeposit)) {
  //   await token.methods.approve(daoAddress, proposalDeposit).send({
  //     from: user,
  //   });
  // }

  const proposal = await dao.methods.sponsorProposal(proposalId);

  const estimatedGas = 6000000;
  const receipt = await getReceipt(proposal, user, estimatedGas);

  return receipt;
};

export default useSponsorProposal;
