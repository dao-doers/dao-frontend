import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { gql } from 'apollo-boost';

import { useQuery } from '@apollo/react-hooks';
import { useInterval } from './useInterval';

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

export const GET_BLOCK = gql`
  {
    _meta {
      block {
        number
      }
    }
  }
`;

const useCheckIndexerStatus = () => {
  const [molochBlock, setMolochBlock] = useState();
  const [layer2Block, setLayer2Block] = useState();

  const { error: molochError, data: molochBlockData } = useQuery(GET_BLOCK, {
    fetchPolicy: 'cache-and-network',
    pollInterval: 10 * 3000,
  });

  useEffect(() => {
    if (molochBlockData) {
      // eslint-disable-next-line no-underscore-dangle
      setMolochBlock(molochBlockData._meta.block.number);
    }
  }, [molochBlockData]);

  const setLatestBlockFromLayer2 = () => {
    return getBlockNumber()
      .then((res: any) => setLayer2Block(res))
      .catch((err: any) => new Error(err));
  };

  useEffect(() => {
    setLatestBlockFromLayer2();
  }, []);

  useInterval(() => {
    setLatestBlockFromLayer2();
  }, 10 * 3000);

  return { molochBlock, layer2Block, molochError };
};

export default useCheckIndexerStatus;
