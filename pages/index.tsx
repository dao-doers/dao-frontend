import type { NextPage } from 'next';
import React, { FC, useRef } from 'react';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

import Layout from 'components/Layout/Layout';
import LoadingPage from 'components/LoadingPage/LoadingPage';

import ProposalTile from 'sections/homePage/ProposalTile/ProposalTile';
import VoteTile from 'sections/homePage/VoteTile/VoteTile';

import { selectSortedProposalsArray } from 'redux/slices/proposals';
import { selectVotesArray } from 'redux/slices/votes';

import useFetchProposals from 'hooks/useFetchProposals';
import useFetchVotes from 'hooks/useFetchVotes';

const StyledPlaylistRemoveIcon = styled(PlaylistRemoveIcon)`
  color: ${({ theme }) => theme.palette.colors.col1};
  font-size: 60px;
`;

const TypographyBlue = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col1};
  font-weight: 600;
`;

const HomePage: FC<NextPage> = () => {
  const sortedProposalsArray = useSelector(selectSortedProposalsArray);
  const votesArray = useSelector(selectVotesArray);

  const loadingProposals = useFetchProposals();
  const loadingVotes = useFetchVotes();
  return (
    <Layout>
      {(loadingProposals.loading || loadingVotes.loading) && <LoadingPage />}

      {!loadingProposals.loading && !loadingVotes.loading && (
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box sx={{ width: { xs: '100%', md: '63%' } }}>
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
                    />
                  );
                })}
              </>
            )}
          </Box>

          <Box width="35%" sx={{ display: { xs: 'none', md: 'block' } }}>
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
      )}
    </Layout>
  );
};

export default HomePage;
