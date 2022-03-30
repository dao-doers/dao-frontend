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
