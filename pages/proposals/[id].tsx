import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import Box from '@mui/material/Box';

import Layout from 'components/Layout/Layout';

import ProposalTile from 'sections/proposalsPage/ProposalTile/ProposalTile';
import VoteTile from 'sections/proposalsPage/VoteTile/VoteTile';

import { selectProposalsArray } from 'redux/slices/proposals';
import { selectVotesArray } from 'redux/slices/votes';

const client = new ApolloClient({
  uri: process.env.INDEXER_URL,
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
    <ApolloProvider client={client as any}>
      <Layout>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box sx={{ width: { xs: '100%', md: '63%' } }}>
            {Object.keys(chosenProposal).length > 0 && <ProposalTile proposal={chosenProposal} />}
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
