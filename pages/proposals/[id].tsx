import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import Box from '@mui/material/Box';

import Layout from 'components/Layout/Layout';
import VoteTile from 'components/VoteTile/VoteTile';
import ProposalTile from 'components/ProposalTile/ProposalTile';

import { selectProposalsArray } from 'redux/slices/proposals';
import { selectVotesArray } from 'redux/slices/votes';
import { Proposal } from 'types/types';

const client = new ApolloClient({
  uri: process.env.INDEXER_URL,
  cache: new InMemoryCache(),
});

const Swap: FC<NextPage> = () => {
  const proposalsArray = useSelector(selectProposalsArray);
  const votesArray = useSelector(selectVotesArray);

  const [chosenProposal, setChosenProposal] = useState<Proposal | undefined>();

  const router = useRouter();

  useEffect(() => {
    if (proposalsArray.length > 0) {
      setChosenProposal(proposalsArray.find(a => router.query.id === a.id));
    }
  }, [proposalsArray]);

  return (
    <ApolloProvider client={client as any}>
      <Layout>
        <Box display="flex" justifyContent="space-between" width="100%" sx={{ mt: { xs: 2, md: 10 } }}>
          <Box sx={{ width: { xs: '100%', md: '63%' } }}>
            {chosenProposal && <ProposalTile proposal={chosenProposal} />}
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
