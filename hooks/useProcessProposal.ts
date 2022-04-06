import abiLibrary from 'lib/abi';

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

const useProcessProposal = async (user: string, daoAddress: any, proposalIndex: number) => {
  const dao = await getDao(daoAddress);
  const proposal = await dao.methods.processProposal(proposalIndex).send({
    gasLimit: 6000000,
    gasPrice: 0,
    from: user,
  });

  const estimatedGas = 6000000;
  const receipt = await getReceipt(proposal, user, estimatedGas);
  console.log(receipt);

  return receipt;
};

export default useProcessProposal;
