import Web3 from 'web3';

import abiLibrary from 'lib/abi';

const web3 = new Web3(process.env.PROVIDER_URL || '');

const getDao = async (address: string) => {
  const dao = await new web3.eth.Contract(abiLibrary.moloch2, address);
  return dao;
};

const useVote = async (proposalId: string, voteValue: number, user: string, daoAddress: any) => {
  const dao = await getDao(daoAddress);
  try {
    await dao.methods.submitVote(proposalId, voteValue).send({ from: user }, (err: any, res: any) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }

  return null;
};

export default useVote;
