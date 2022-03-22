import Web3 from 'web3';

import abiLibrary from 'lib/abi';

const web3 = new Web3(process.env.PROVIDER_URL || '');

const getDao = async (address: string) => {
  const dao = await new web3.eth.Contract(abiLibrary.moloch2, address);
  return dao;
};

const useNotVotedYetCheck = async (user: string, proposalIndex: any, daoAddress: string) => {
  const dao = await getDao(daoAddress);

  const response = await dao.methods.getMemberProposalVote(user, proposalIndex).call({}, (err: any, res: any) => {
    if (err) {
      return err;
    }
    return res;
  });
  return response === 0 || response === '0';
};

export default useNotVotedYetCheck;
