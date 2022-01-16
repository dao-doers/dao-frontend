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
import Web3 from 'web3';

import useCheckBalance from 'hooks/useCheckBalance';
import { shannonsToCkb } from 'utils/formatShannons';

// TODO: refactor whole component, move function to useCheckIndexerStatus
// TODO: change to import "" from ""
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
    return getBlockNumber()
      .then((res: any) => setLayer2Block(res))
      .catch((err: any) => console.error('Nervos Layer 2 not available: ', err));
  };

  useEffect(() => {
    setLatestBlock();
    setLatestBlockFromLayer2();
  }, [molochBlock, layer2Block]);

  const balance = useCheckBalance();

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
              <Typography px={2}>
                offline{' '}
                {typeof layer2Block === 'number' &&
                typeof molochBlock === 'number' &&
                !Number.isNaN(layer2Block) &&
                !Number.isNaN(molochBlock) ? (
                  <>({layer2Block - molochBlock} blocks behind)</>
                ) : (
                  ''
                )}{' '}
              </Typography>
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
            <Typography ml={1} noWrap>
              {shannonsToCkb(balance).toFixed(4)} dCKB
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default BlockchainStatus;
