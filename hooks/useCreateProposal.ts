import BigNumber from 'bignumber.js/bignumber';

import abiLibrary from 'lib/abi';

const daoAddress = process.env.DAO_ADDRESS || '';
const tributeToken = process.env.TRIBUTE_TOKEN_ADDRESS;
const paymentToken = process.env.TRIBUTE_TOKEN_ADDRESS;

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

const useCreateProposal = async (
  user: string,
  applicantAddress: string,
  sharesRequested: number,
  lootRequested: number,
  tributeOffered: BigNumber.Value,
  paymentRequested: BigNumber.Value,
  details: { title: any; description: any; link: any },
) => {
  const exponentialValue = new BigNumber(10 ** 8);
  const tributeOfferedToExponential = new BigNumber(tributeOffered).multipliedBy(exponentialValue);
  const paymentRequestedToExponential = new BigNumber(paymentRequested).multipliedBy(exponentialValue);

  const dao = await getDao(daoAddress);
  const token = new web3.eth.Contract(abiLibrary.erc20, tributeToken);

  // TODO: check if there is existing approval in case if user approved first MM request and rejected second
  console.log('token whitelist', {
    a: await dao.methods.tokenWhitelist(tributeToken).call(),
    daoAddress,
    existingApproval: await token.methods.allowance(user, daoAddress).call(),
  });

  const approveTx = await token.methods.approve(daoAddress, tributeOfferedToExponential).send({
    gasLimit: 6000000,
    gasPrice: 0,
    from: user,
  });

  console.log({
    approveTx,
  });

  console.log('submitProposal', {
    applicantAddress,
    sharesRequested,
    lootRequested,
    tributeOfferedToExponential,
    tributeToken,
    paymentRequestedToExponential,
    paymentToken,
  });

  const proposal = await dao.methods.submitProposal(
    applicantAddress,
    sharesRequested,
    lootRequested,
    tributeOfferedToExponential,
    tributeToken,
    paymentRequestedToExponential,
    paymentToken,
    `{"title": "${details.title}", "description": "${details.description}", "link": "${details.link}"}`,
  );

  const estimatedGas = 6000000;
  const receipt = await getReceipt(proposal, user, estimatedGas);
  console.log(receipt);
  return receipt;
};

export default useCreateProposal;
