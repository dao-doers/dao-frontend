/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/no-var-requires */
import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { gql } from 'apollo-boost';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DAOTile from 'components/DAOTile/DAOTile';
import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton';

import { selectUserAddress } from 'redux/slices/user';

import { config } from 'config/config';

import DAO_TILE_VARIANTS from 'enums/daoTileVariants';

import formatAddress from 'utils/formatAddress';

// TODO: refactor whole component, move function to useCheckIndexerStatus
// TODO: change to import "" from ""
const Web3 = require('web3');
const { PolyjuiceAccounts, PolyjuiceHttpProvider } = require('@polyjuice-provider/web3');

const providerConfig = {
  web3Url: process.env.PROVIDER_CONFIG_WEB3_URL,
};

const provider = new PolyjuiceHttpProvider(providerConfig.web3Url, providerConfig);

const polyjuiceAccounts = new PolyjuiceAccounts(providerConfig);

const web3 = new Web3(provider);
web3.eth.accounts = polyjuiceAccounts;
web3.eth.Contract.setProvider(provider, web3.eth.accounts);

export const getBlockNumber = web3.eth.getBlockNumber();

const molochClient = new ApolloClient({
  uri: config.graph.moloch,
  cache: new InMemoryCache(),
});

const TypographyBold = styled(Typography)`
  font-weight: 600;
`;

const BlockchainStatus: FC = () => {
  const userAddress = useSelector(selectUserAddress);

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
    return getBlockNumber
      .then((res: any) => setLayer2Block(res))
      .catch((err: any) => console.error('Nervos Layer 2 not available: ', err));
  };

  useEffect(() => {
    setLatestBlock();
    setLatestBlockFromLayer2();
  }, [molochBlock, layer2Block]);

  return (
    <Box display="flex" justifyContent="flex-end" py={4} width="100%">
      <Box display="flex" alignItems="center" mr={4}>
        <Typography px={2}>Indexer status:</Typography>
        {molochBlock === layer2Block ? (
          <Box>
            <DAOTile variant={DAO_TILE_VARIANTS.GREEN_OUTLINE}>
              <Typography px={2}>online</Typography>
            </DAOTile>
          </Box>
        ) : (
          <Box>
            <DAOTile variant={DAO_TILE_VARIANTS.RED_OUTLINE}>
              <Typography px={2}>offline</Typography>
            </DAOTile>
          </Box>
        )}
      </Box>
      <Box display="flex" alignItems="center">
        {userAddress === '' ? (
          <ConnectWalletButton />
        ) : (
          <>
            <Typography noWrap>User address: </Typography>
            <Box ml={2}>
              <DAOTile variant={DAO_TILE_VARIANTS.GRADIENT_OUTLINE}>
                <TypographyBold px={2}>{formatAddress(userAddress)}</TypographyBold>
              </DAOTile>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default BlockchainStatus;
