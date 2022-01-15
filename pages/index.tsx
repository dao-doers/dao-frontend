import type { NextPage } from 'next';
import React, { FC, useEffect } from 'react';
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

const client = new ApolloClient({
  uri: config.graph.moloch,
  cache: new InMemoryCache(),
});

const Swap: FC<NextPage> = () => {
  const proposalsArray = useSelector(selectProposalsArray);
  const votesArray = useSelector(selectVotesArray);

  const erc20 = useERC20Contract('0xc03da4356b4030f0ec2494c18dcfa426574e10d5');

  useEffect(async () => {
    const balance = await erc20?.methods.balanceOf('0xD173313A51f8fc37BcF67569b463abd89d81844f').call();
    console.log('balance', balance);
  }, [erc20]);

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
