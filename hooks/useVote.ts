import Web3 from 'web3';
import PolyjuiceHttpProvider from '@polyjuice-provider/web3';

import abiLibrary from 'lib/abi';

const providerConfig = {
  web3Url: 'https://godwoken-testnet-web3-rpc.ckbapp.dev',
};

const provider = new PolyjuiceHttpProvider(providerConfig.web3Url, providerConfig);

const web3 = new Web3(provider);

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
