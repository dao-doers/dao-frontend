import Web3 from 'web3';
import BigNumber from 'bignumber.js/bignumber';

import abiLibrary from 'lib/abi';

const getDao = async (address: string) => {
  const dao = await new web3.eth.Contract(abiLibrary.moloch2, address);
  return dao;
};

const getReceipt = async (proposal: any, user: string, estimatedGas: number) => {
  let receipt;
  try {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    receipt = await proposal.send({ from: user, gas: estimatedGas }).on('receipt', (receipt: any) => {
      return receipt;
    });
  } catch (err) {
    receipt = err;
  }
  return receipt;
};

const useCreateProposal = async (
  /* Wallet information */
  user: string,
  /* Contract information */
  library: any,
  version: number,
  daoAddress: string,
  /* Proposal information */
  applicantAddress: string,
  sharesRequested: number,
  lootRequested: number,
  tributeOffered: BigNumber.Value,
  tributeToken: string | undefined,
  paymentRequested: BigNumber.Value,
  paymentToken: string | undefined,
  details: { title: any; description: any; link: any },
) => {
  if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    window.web3 = new Web3(window.ethereum);
  }

  const exponentialValue = new BigNumber(10 ** 8);
  const tributeOfferedToExponential = new BigNumber(tributeOffered).multipliedBy(exponentialValue);
  const paymentRequestedToExponential = new BigNumber(paymentRequested).multipliedBy(exponentialValue);
  const dao = await getDao(daoAddress);
  const token = new web3.eth.Contract(abiLibrary.erc20, await dao.methods.depositToken().call());

  const userBalance = new BigNumber(await token.methods.balanceOf(user).call());
  const allowance = await token.methods.allowance(user, daoAddress).call();
  const requiredAllowance = new BigNumber(tributeOfferedToExponential);

  if (userBalance.lt(requiredAllowance)) {
    console.log('Not enough funds to pay the tribute.');
  }

  console.log(allowance, 'allowance');
  console.log(requiredAllowance, 'requiredAllowance');

  if (allowance.lt(requiredAllowance)) {
    // throws error: eth_sendTransaction is not supported!
    await token.methods
      .approve(daoAddress, requiredAllowance)
      .send({
        from: user,
      })
      .on('receipt', () => {
        console.log('receipt');
      })
      .on('error', error => {
        console.log(error);
      });
  }

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
