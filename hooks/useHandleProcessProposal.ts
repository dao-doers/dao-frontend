import abiLibrary from 'lib/abi';

const getDao = async (address: string) => {
  const dao = await new web3.eth.Contract(abiLibrary.moloch2, address);
  return dao;
};

const useHandleProcessProposal = async (user: string, daoAddress: any, proposalIndex: number) => {
  const dao = await getDao(daoAddress);

  const responce = await dao.methods
    .processProposal(proposalIndex)
    .send({
      gasLimit: 6000000,
      gasPrice: 0,
      from: user,
    })
    .on('receipt', (receipt: any) => {
      return receipt;
    });

  return responce;
};

export default useHandleProcessProposal;
