import type { NextPage } from 'next';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';

import Layout from 'components/Layout/Layout';

import Intro from 'sections/homepage/Intro/Intro';
import About from 'sections/homepage/About/About';
import LastProposals from 'sections/homepage/LastProposals/LastProposals';
import LastVotes from 'sections/homepage/LastVotes/LastVotes';

import { selectSortedProposalsArray } from 'redux/slices/proposals';
import { selectVotesArray } from 'redux/slices/votes';

import useFetchProposals from 'hooks/useFetchProposals';
import useFetchVotes from 'hooks/useFetchVotes';

const HomePage: FC<NextPage> = () => {
  const sortedProposalsArray = useSelector(selectSortedProposalsArray);
  const votesArray = useSelector(selectVotesArray);

  const loadingProposals = useFetchProposals();
  const loadingVotes = useFetchVotes();

  return (
    <Layout>
      {!loadingProposals.loading && !loadingVotes.loading && (
        <Box sx={{ pl: { xs: 0, md: 6 } }}>
          <Intro />
          <About />
          <LastProposals />
          <LastVotes />
        </Box>
      )}
    </Layout>
  );
};

export default HomePage;
