import { useState, useEffect } from 'react';
import Web3 from 'web3';
import ApolloClient, { InMemoryCache, gql } from 'apollo-boost';

import config from 'config/config';

// TODO: change to import "" from ""
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PolyjuiceAccounts, PolyjuiceHttpProvider } = require('@polyjuice-provider/web3');

const providerConfig = {
  web3Url: process.env.PROVIDER_CONFIG_WEB3_URL,
};

const provider = new PolyjuiceHttpProvider(providerConfig.web3Url, providerConfig);
let polyjuiceAccounts;
let web3: Web3;

if (typeof window !== 'undefined') {
  polyjuiceAccounts = new PolyjuiceAccounts(providerConfig);

  web3 = new Web3(provider);

  web3.eth.accounts = polyjuiceAccounts;
  (web3.eth.Contract as any).setProvider(provider, web3.eth.accounts);
}

export const getBlockNumber = () => web3.eth.getBlockNumber();

const molochClient = new ApolloClient({
  uri: config.graph.moloch,
  cache: new InMemoryCache(),
});

const useCheckIndexerStatus = () => {
  const [molochBlock, setMolochBlock] = useState();
  const [layer2Block, setLayer2Block] = useState();

  const setLatestBlock = () => {
    return (
      molochClient
        .query({
          query: gql`
            {
              _meta {
                block {
                  number
                }
              }
            }
          `,
        })
        // eslint-disable-next-line no-underscore-dangle
        .then(res => setMolochBlock(res.data._meta.block.number))
        .catch(err => console.error('DAOs subgraph not available: ', err))
    );
  };

  const setLatestBlockFromLayer2 = () => {
    return getBlockNumber()
      .then((res: any) => setLayer2Block(res))
      .catch((err: any) => console.error('Nervos Layer 2 not available: ', err));
  };

  useEffect(() => {
    setLatestBlock();
    setLatestBlockFromLayer2();
  }, []);

  useEffect(() => {
    // we have to copy that functions to trigger them also on first page render, not only after 30 seconds
    // // it may be done in much elegance way but i'm not sure if that is necessary
    setInterval(() => {
      setLatestBlock();
      setLatestBlockFromLayer2();
    }, 30000);
  }, [molochBlock, layer2Block]);

  return { molochBlock, layer2Block };
};

export default useCheckIndexerStatus;
