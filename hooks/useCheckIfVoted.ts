import { useSelector } from 'react-redux';
import { ethers } from 'ethers';

import abiLibrary from 'lib/abi';

import { selectProvider } from 'redux/slices/main';

const useCheckIfVoted = async (user: string, proposalIndex: any, daoAddress: string) => {
  const provider = useSelector(selectProvider);

  const dao = await new ethers.Contract(daoAddress, abiLibrary.moloch2, provider);

  const response = await dao.getMemberProposalVote(user, proposalIndex).call({}, (err: any, res: any) => {
    if (err) {
      return err;
    }
    return res;
  });
  return response === 0 || response === '0';
};

export default useCheckIfVoted;
