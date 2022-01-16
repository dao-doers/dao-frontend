import type { NextPage } from 'next';
import React, { FC, useEffect, useState } from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';

import Layout from 'components/Layout/Layout';

import ProposalTile from 'sections/homePage/ProposalTile/ProposalTile';
import VoteTile from 'sections/homePage/VoteTile/VoteTile';
import FetchDataComponent from 'sections/homePage/FetchDataComponent/FetchDataComponent';
import { config } from 'config/config';

import { selectProposalsArray } from 'redux/slices/proposals';
import { selectVotesArray } from 'redux/slices/votes';

import useERC20Contract from 'hooks/useERC20Contract';
import { selectUserAddress } from 'redux/slices/user';

const { AddressTranslator } = require('nervos-godwoken-integration');

const client = new ApolloClient({
  uri: config.graph.moloch,
  cache: new InMemoryCache(),
});

const Swap: FC<NextPage> = () => {
  const [polyjuiceAddress, setPolyjuiceAddress] = useState<string | undefined>();
  const [balance, setBalance] = useState<string | undefined>();
  const proposalsArray = useSelector(selectProposalsArray);
  const votesArray = useSelector(selectVotesArray);
  const userAddress = useSelector(selectUserAddress);
  const { SUDT_PROXY_CONTRACT_ADDRESS } = config;

  useEffect(() => {
    if (userAddress) {
      const addressTranslator = new AddressTranslator();
      setPolyjuiceAddress(addressTranslator.ethAddressToGodwokenShortAddress(userAddress));
    } else {
      setPolyjuiceAddress(undefined);
    }
  }, [userAddress]);

  const erc20 = useERC20Contract(SUDT_PROXY_CONTRACT_ADDRESS);
  console.log('polyjuiceAddress', polyjuiceAddress);
  useEffect(async () => {
    if (polyjuiceAddress !== undefined) {
    setBalance(await erc20?.methods.balanceOf(polyjuiceAddress).call({ from: userAddress }));
    console.log('balance', balance);
    }
  }, [erc20, balance]);


  return (
    <ApolloProvider client={client as any}>
      <Layout>
        <Box display="flex" justifyContent="space-between" width="100%">
          <FetchDataComponent />
          <Box sx={{ width: { xs: '100%', md: '63%' } }}>
            {proposalsArray.map((proposal: any, id: any) => {
              return <ProposalTile id={`proposal-${id}`} proposal={proposal} />;
            })}
          </Box>
          <Box width="35%" sx={{ display: { xs: 'none', md: 'block' } }}>
            {votesArray.map((vote: any, id: any) => {
              return <VoteTile id={`poll-${id}`} vote={vote} />;
            })}
          </Box>
        </Box>
      </Layout>
    </ApolloProvider>
  );
};

export default Swap;
