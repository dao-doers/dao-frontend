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

const getReceipt = async (proposal: any, user: string, estimatedGas: number) => {
  let receipt;
  try {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    receipt = await proposal.send({ from: user, gas: estimatedGas }).on('receipt', (receipt: any) => {
      return receipt;
    });
  } catch (err) {
    receipt = err;
  }
  return receipt;
};

const useProcessProposal = async (user: string, daoAddress: string, proposalIndex: number) => {
  const dao = await getDao(daoAddress);
  const proposal = await dao.methods.processProposal(proposalIndex);
  const estimatedGas = 6000000;
  const receipt = await getReceipt(proposal, user, estimatedGas);
  console.log(receipt);

  return receipt;
};

export default useProcessProposal;
