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

const useHandleSponsorProposal = async (user: string, daoAddress: any, proposalId: string) => {
  const dao = await getDao(daoAddress);
  const token = new web3.eth.Contract(abiLibrary.erc20, tributeToken);

  const proposalDeposit = new BigNumber(await dao.methods.proposalDeposit().call());

  // TODO: check if there is existing approval in case if user approved first MM request and rejected second
  // console.log('token whitelist', {
  //   a: await dao.methods.tokenWhitelist(tributeToken).call(),
  //   daoAddress,
  //   existingApproval: await token.methods.allowance(user, daoAddress).call(),
  // });

  const approveTx = await token.methods.approve(daoAddress, proposalDeposit).send({
    gasLimit: 6000000,
    gasPrice: 0,
    from: user,
  });

  const proposal = await dao.methods.sponsorProposal(proposalId);

  const estimatedGas = 6000000;
  const receipt = await getReceipt(proposal, user, estimatedGas);
  return receipt;
};

export default useHandleSponsorProposal;
