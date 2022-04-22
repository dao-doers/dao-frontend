import abiLibrary from 'lib/abi';

const daoAddress = process.env.DAO_ADDRESS || '';

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

const useHandleVote = async (proposalId: string, voteValue: number, user: string) => {
  const dao = await getDao(daoAddress);

  const proposal = await dao.methods.submitVote(proposalId, voteValue);

  const estimatedGas = 6000000;
  const receipt = await getReceipt(proposal, user, estimatedGas);
  console.log(receipt);
  return receipt;
};

export default useHandleVote;
