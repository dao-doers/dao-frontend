import type { NextPage } from 'next';
import React, { FC } from 'react';

import Box from '@mui/material/Box';

import Layout from 'components/Layout/Layout';

import Intro from 'sections/homepage/Intro/Intro';
import About from 'sections/homepage/About/About';
import LastProposals from 'sections/homepage/LastProposals/LastProposals';
import LastVotes from 'sections/homepage/LastVotes/LastVotes';

import useTransferERC20 from 'hooks/useTransferERC20';

const HomePage: FC<NextPage> = () => {
  const handleClick = () => {
    useTransferERC20();
  };
  return (
    <Layout>
      <Box sx={{ pl: { xs: 0, md: 6 } }}>
        <button onClick={handleClick}>ssdfvsdfvdfvdfvdvd</button>
        <Intro />
        <About />
        <LastProposals />
        <LastVotes />
      </Box>
    </Layout>
  );
};

export default HomePage;
