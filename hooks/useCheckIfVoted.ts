import abiLibrary from 'lib/abi';

const getDao = async (address: string) => {
  const dao = await new web3.eth.Contract(abiLibrary.moloch2, address);
  return dao;
};

const useCheckIfVoted = async (user: string, proposalIndex: any, daoAddress: string) => {
  const dao = await getDao(daoAddress);

  const response = await dao.methods.getMemberProposalVote(user, proposalIndex).call({}, (err: any, res: any) => {
    if (err) {
      return err;
    }
    return res;
  });
  return response === 0 || response === '0';
};

export default useCheckIfVoted;
