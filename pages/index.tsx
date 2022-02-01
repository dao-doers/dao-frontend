import type { NextPage } from 'next';
import React, { FC } from 'react';
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
import DAOButton from 'components/DAOButton/DAOButton';

import SyncIcon from '@mui/icons-material/Sync';
import Timer from 'components/Timer/Timer';
import Tooltip from '@mui/material/Tooltip';
import DAOPlainButton from 'components/DAOPlainButton/DAOPlainButton';

const StyledPlaylistRemoveIcon = styled(PlaylistRemoveIcon)`
  color: ${({ theme }) => theme.palette.colors.col1};
  font-size: 60px;
`;

const TypographyBlue = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col1};
  font-weight: 600;
`;

const TypographyBold = styled(Typography)`
  font-weight: 600;
`;

const HomePage: FC<NextPage> = () => {
  const sortedProposalsArray = useSelector(selectSortedProposalsArray);
  const votesArray = useSelector(selectVotesArray);

  const loadingProposals = useFetchProposals();
  const loadingVotes = useFetchVotes();
  const refetchProposal = useFetchProposals();
  const timer = <Timer reset={loadingProposals.loading} />;

  return (
    <Layout>
      {(loadingProposals.loading || loadingVotes.loading) && <LoadingPage />}
      <Box display="flex" alignSelf="flex-end" justifyContent="flex-end" pb={2}>
        <Box display="flex" flexDirection="column" pr={2}>
          <TypographyBold variant="h5">Recent Activity </TypographyBold>
          <Box>{timer}</Box>
        </Box>
        <Box display="flex" width="50px">
          <DAOPlainButton variant="gradientOutline" onClick={() => refetchProposal.refetch}>
            <Tooltip arrow title="Refresh data" placement="top">
              <SyncIcon />
            </Tooltip>
          </DAOPlainButton>
        </Box>
      </Box>
      {sortedProposalsArray.length > 0 && votesArray.length > 0 && (
        <Box display="flex" justifyContent="space-between" width="100%">
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
      )}
    </Layout>
  );
};

export default HomePage;
