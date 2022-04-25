import abiLibrary from 'lib/abi';

const getDao = async (address: string) => {
  const dao = await new web3.eth.Contract(abiLibrary.moloch2, address);
  return dao;
};

// TODO: TypeError: proposal.send is not a function
const getReceipt = async (proposal: any, user: string, estimatedGas: number) => {
  let receipt;
  try {
    receipt = await proposal.call({ from: user, gas: estimatedGas }).on('receipt', (receipt: any) => {
      return receipt;
    });
  } catch (err) {
    receipt = err;
  }
  return receipt;
};

const useHandleProcessProposal = async (user: string, daoAddress: any, proposalIndex: number) => {
  const dao = await getDao(daoAddress);

  const receipt = await dao.methods
    .processProposal(proposalIndex)
    .send({
      gasLimit: 6000000,
      gasPrice: 0,
      from: user,
    })
    .on('receipt', (receipt: any) => {
      return receipt;
    });

  // const receipt = await getReceipt(proposal, user, estimatedGas);
  return receipt;
};

export default useHandleProcessProposal;
