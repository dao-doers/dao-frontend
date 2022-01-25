import abiLibrary from 'lib/abi';
import Web3 from 'web3';
import { AddressTranslator } from 'nervos-godwoken-integration';
import { PolyjuiceAccounts, PolyjuiceHttpProvider } from '@polyjuice-provider/web3';

const providerConfig = {
  web3Url: 'https://godwoken-testnet-web3-rpc.ckbapp.dev',
};

const addressTranslator = new AddressTranslator();

const provider = new PolyjuiceHttpProvider(providerConfig.web3Url, providerConfig);

let polyjuiceAccounts;
let web3: Web3;

if (typeof window !== 'undefined') {
  polyjuiceAccounts = new PolyjuiceAccounts(providerConfig);

  web3 = new Web3(provider);

  web3.eth.accounts = polyjuiceAccounts;
  (web3.eth.Contract as any).setProvider(provider, web3.eth.accounts);
}

const isMember = async (
  memberAddress,
  /* Contract information */
  contractAddress,
) => {
  const web3 = await new Web3((window as any).web3.currentProvider);

  const isAddress = await web3.utils.isAddress(memberAddress);
  if (!isAddress) return false;

  const dao = await new web3.eth.Contract(abiLibrary.moloch2, contractAddress);

  const memberPolyAddress = addressTranslator.ethAddressToGodwokenShortAddress(memberAddress);

  console.log({
    memberAddress,
    contractAddress,
    memberPolyAddress,
  });

  const response = await dao.methods.members(memberPolyAddress).call({}, (err, res) => {
    console.log('call', {
      err,
      res,
    });
    if (err) {
      console.error(err);
      return err;
    }
    return res;
  });
  return response.exists;
};

export default isMember;
