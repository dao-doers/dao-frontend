import Web3 from 'web3';

import abiLibrary from 'lib/abi';

const getDao = async (address: string) => {
  const dao = await new web3.eth.Contract(abiLibrary.moloch2, address);
  return dao;
};

const useVote = async (proposalId: string, voteValue: number, user: string, daoAddress: any) => {
  if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    window.web3 = new Web3(window.ethereum);
  }

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
