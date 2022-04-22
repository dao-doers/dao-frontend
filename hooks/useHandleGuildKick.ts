// TODO: we gonna need that in future - not tested
/* eslint-disable @typescript-eslint/no-shadow */
import Web3 from 'web3';

import abiLibrary from 'lib/abi';

const web3 = new Web3(process.env.PROVIDER_URL || '');

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

const useHandleGuildKick = async (
  /* Wallet information */
  user: string,
  /* Contract information */
  library: any,
  version: any,
  address: string,
  /* Proposal information */
  memberToKick: number,
  details: string,
) => {
  const dao = await getDao(address);

  const proposal = await dao.methods.submitGuildKickProposal(memberToKick, details);

  const estimatedGas = 6000000;
  const receipt = await getReceipt(proposal, user, estimatedGas);

  return receipt;
};

export default useHandleGuildKick;
