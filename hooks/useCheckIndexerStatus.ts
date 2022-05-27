import { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';

import { selectProvider } from 'redux/slices/main';

import { useInterval } from './useInterval';

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
  const provider = useSelector(selectProvider);

  const [molochBlock, setMolochBlock] = useState();
  const [layer2Block, setLayer2Block] = useState();
  const [layer2BlockLoading, setLayer2BlockLoading] = useState(false);

  console.log(molochBlock, 'molochBlock');
  console.log(layer2Block, 'layer2Block');

  const getBlockNumber = () => provider.getBlockNumber();

  const { loading: molochLoading, error: molochError, data: molochBlockData } = useQuery(GET_BLOCK, {
    fetchPolicy: 'cache-and-network',
    pollInterval: 30 * 1000,
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
