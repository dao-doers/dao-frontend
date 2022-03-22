import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { gql } from 'apollo-boost';

import { useQuery } from '@apollo/react-hooks';
import { useInterval } from './useInterval';

const web3 = new Web3(process.env.PROVIDER_URL || '');

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
  const [layer2BlockLoading, setLayer2BlockLoading] = useState(false);

  const { loading: molochLoading, error: molochError, data: molochBlockData } = useQuery(GET_BLOCK, {
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
      .then((res: any) => {
        setLayer2Block(res);
        setLayer2BlockLoading(true);
      })
      .catch((err: any) => new Error(err));
  };

  useEffect(() => {
    setLatestBlockFromLayer2();
  }, []);

  useInterval(() => {
    setLatestBlockFromLayer2();
  }, 10 * 3000);

  return { molochBlock, layer2Block, molochError, molochLoading, layer2BlockLoading };
};

export default useCheckIndexerStatus;
