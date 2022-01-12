import useSWR from "swr"
const { PolyjuiceAccounts, PolyjuiceHttpProvider } = require('@polyjuice-provider/web3');
import Web3 from 'web3';

const providerConfig = {
  web3Url: process.env.PROVIDER_CONFIG_WEB3_URL,
};

const provider = new PolyjuiceHttpProvider(providerConfig.web3Url, providerConfig);
let polyjuiceAccounts;
let web3

if (typeof window !== 'undefined') {
  polyjuiceAccounts = new PolyjuiceAccounts(providerConfig);

  web3 = new Web3(provider);

  web3.eth.accounts = polyjuiceAccounts;
  (web3.eth.Contract).setProvider(provider, web3.eth.accounts);
}

export const handler = () => () => {
const {data, ...rest } = useSWR(() => {
  return web3 ? "web3/block" : null },
  async () => {
    const blocks = await web3.eth.getBlockNumber()

    if (!blocks) {
        throw new Error("Cannot retreive block. Please refresh the browser.")
    }
    return blocks
  }
)

  return { block: {
    data,
    ...rest
  } }
}