import type { NextPage } from 'next';
import React, { FC, useEffect, useState } from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';

import Layout from 'components/Layout/Layout';

import ProposalTile from 'sections/homePage/ProposalTile/ProposalTile';
import VoteTile from 'sections/homePage/VoteTile/VoteTile';
import FetchDataComponent from 'sections/homePage/FetchDataComponent/FetchDataComponent';

import { config } from 'config/config';

import { selectProposalsArray } from 'redux/slices/proposals';
import { selectVotesArray } from 'redux/slices/votes';

const client = new ApolloClient({
  uri: config.graph.moloch,
  cache: new InMemoryCache(),
});

const Swap: FC<NextPage> = () => {
  const proposalsArray = useSelector(selectProposalsArray);
  const votesArray = useSelector(selectVotesArray);

  const [chosenProposal, setChosenProposal] = useState({});

  const router = useRouter();

  useEffect(() => {
    if (proposalsArray.length > 0) {
      setChosenProposal(proposalsArray.find((a: any) => router.query.id === a.id));
    }
  }, [proposalsArray]);

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Box display="flex" justifyContent="space-between" width="100%">
          <FetchDataComponent />
          <Box sx={{ width: { xs: '100%', md: '63%' } }}>
            {Object.keys(chosenProposal).length > 0 && <ProposalTile proposal={chosenProposal} />}
          </Box>
          <Box width="35%" sx={{ display: { xs: 'none', md: 'block' } }}>
            {votesArray.map((vote, id) => {
              return <VoteTile id={`poll-${id}`} vote={vote} />;
            })}
          </Box>
        </Box>
      </Layout>
    </ApolloProvider>
  );
};

export default Swap;
