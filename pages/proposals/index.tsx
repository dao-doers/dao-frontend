import type { NextPage } from 'next';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import Typography from '@mui/material/Typography';

import Layout from 'components/Layout/Layout';
import VoteTile from 'components/VoteTile/VoteTile';
import ProposalTile from 'components/ProposalTile/ProposalTile';

import { selectSortedProposalsArray } from 'redux/slices/proposals';
import { selectVotesArray } from 'redux/slices/votes';

const StyledPlaylistRemoveIcon = styled(PlaylistRemoveIcon)`
  color: ${({ theme }) => theme.palette.colors.col1};
  font-size: 60px;
`;

const TypographyBlue = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col1};
  font-weight: 500;
`;

const HomePage: FC<NextPage> = () => {
  const sortedProposalsArray = useSelector(selectSortedProposalsArray);
  const votesArray = useSelector(selectVotesArray);

  return (
    <Layout>
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        sx={{ mt: { xs: 2, md: 10 }, ml: { xs: 0, md: 5 } }}
      >
        <Box sx={{ width: { xs: '100%', md: '66%' } }}>
          {sortedProposalsArray.length === 0 && (
            <Box display="flex" flexDirection="column" alignItems="center">
              <StyledPlaylistRemoveIcon />
              <TypographyBlue>There are no proposals of selected type</TypographyBlue>
            </Box>
          )}

          {sortedProposalsArray.length > 0 && (
            <>
              {sortedProposalsArray.map((proposal: any) => {
                return (
                  <ProposalTile
                    key={`proposal-${proposal.proposalId}`}
                    id={`proposal-${proposal.proposalId}`}
                    proposal={proposal}
                    mbProps={3}
                  />
                );
              })}
            </>
          )}
        </Box>

        <Box width="32%" sx={{ display: { xs: 'none', md: 'block' } }}>
          {votesArray.length === 0 && (
            <Box display="flex" flexDirection="column" alignItems="center">
              <StyledPlaylistRemoveIcon />
              <TypographyBlue>There are no votes yet</TypographyBlue>
            </Box>
          )}
          {votesArray.length > 0 && (
            <>
              {votesArray.map((vote: any) => {
                return <VoteTile key={`vote-${vote.id}`} vote={vote} />;
              })}
            </>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default HomePage;
