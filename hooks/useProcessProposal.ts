import Web3 from 'web3';

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

const useProcessProposal = async (user: string, daoAddress: any, proposalIndex: number) => {
  if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    window.web3 = new Web3(window.ethereum);
  }

  const dao = await getDao(daoAddress);
  const proposal = await dao.methods.processProposal(proposalIndex).send({
    gasPrice: 1000,
    gas: 100000,
  });
  const estimatedGas = 6000000;
  const receipt = await getReceipt(proposal, user, estimatedGas);
  console.log(receipt);

  return receipt;
};

export default useProcessProposal;
