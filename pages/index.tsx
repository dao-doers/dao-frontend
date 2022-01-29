import type { NextPage } from 'next';
import React, { FC } from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

import Layout from 'components/Layout/Layout';

import ProposalTile from 'sections/homePage/ProposalTile/ProposalTile';
import VoteTile from 'sections/homePage/VoteTile/VoteTile';
import FetchDataComponent from 'sections/homePage/FetchDataComponent/FetchDataComponent';

import config from 'config/config';

import { selectSortedProposalsArray } from 'redux/slices/proposals';
import { selectVotesArray } from 'redux/slices/votes';

const client = new ApolloClient({
  uri: config.graph.moloch,
  cache: new InMemoryCache(),
});

const StyledPlaylistRemoveIcon = styled(PlaylistRemoveIcon)`
  color: ${({ theme }) => theme.palette.colors.col1};
  font-size: 60px;
`;

const TypographyBlue = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col1};
  font-weight: 600;
`;

const Swap: FC<NextPage> = () => {
  const sortedProposalsArray = useSelector(selectSortedProposalsArray);
  const votesArray = useSelector(selectVotesArray);

  return (
    <ApolloProvider client={client as any}>
      <Layout>
        <Box display="flex" justifyContent="space-between" width="100%">
          <FetchDataComponent />
          <Box sx={{ width: { xs: '100%', md: '63%' } }}>
            {sortedProposalsArray.length === 0 && (
              <Box display="flex" flexDirection="column" alignItems="center">
                <StyledPlaylistRemoveIcon />
                <TypographyBlue>There are no proposals of selected type</TypographyBlue>
              </Box>
            )}

            {sortedProposalsArray.map((proposal: any) => {
              return (
                <ProposalTile
                  key={`proposal-${proposal.proposalId}`}
                  id={`proposal-${proposal.proposalId}`}
                  proposal={proposal}
                />
              );
            })}
          </Box>
          <Box width="35%" sx={{ display: { xs: 'none', md: 'block' } }}>
            {votesArray.length === 0 && (
              <Box display="flex" flexDirection="column" alignItems="center">
                <StyledPlaylistRemoveIcon />
                <TypographyBlue>There are no votes yet</TypographyBlue>
              </Box>
            )}

            {votesArray.map((vote: any) => {
              return <VoteTile key={`vote-${vote.id}`} vote={vote} />;
            })}
          </Box>
        </Box>
      </Layout>
    </ApolloProvider>
  );
};

export default Swap;
