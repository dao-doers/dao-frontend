import Web3 from 'web3';
import PolyjuiceHttpProvider from '@polyjuice-provider/web3';
import { AddressTranslator } from 'nervos-godwoken-integration';

import { abiLibrary } from 'lib/abi.js';

const providerConfig = {
  web3Url: 'https://godwoken-testnet-web3-rpc.ckbapp.dev',
};
const addressTranslator = new AddressTranslator();
const provider = new PolyjuiceHttpProvider(providerConfig.web3Url, providerConfig);
const web3 = new Web3(provider);

const getDao = async (address: string) => {
  const dao = await new web3.eth.Contract(abiLibrary.moloch2, address);
  return dao;
};

const useNotVotedYetCheck = async (user: string, proposalIndex: any, daoAddress: string) => {
  const dao = await getDao(daoAddress);
  const accountPolyAddress = addressTranslator.ethAddressToGodwokenShortAddress(user);

  const response = await dao.methods
    .getMemberProposalVote(accountPolyAddress, proposalIndex)
    .call({}, (err: any, res: any) => {
      if (err) {
        return err;
      }
      return res;
    });
  return response === 0 || response === '0';
};

export default useNotVotedYetCheck;
