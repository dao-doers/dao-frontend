import type { NextPage } from 'next';
import React, { FC } from 'react';

import Box from '@mui/material/Box';

import Layout from 'components/Layout/Layout';

import Intro from 'sections/homepage/Intro/Intro';
import About from 'sections/homepage/About/About';
import LastProposals from 'sections/homepage/LastProposals/LastProposals';
import LastVotes from 'sections/homepage/LastVotes/LastVotes';

const HomePage: FC<NextPage> = () => {
  return (
    <Layout>
      <Box sx={{ pl: { xs: 0, md: 6 } }}>
        <Intro />
        <About />
        <LastProposals />
        <LastVotes />
      </Box>
    </Layout>
  );
};

export default HomePage;
