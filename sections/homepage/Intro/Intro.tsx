import React, { FC } from 'react';
import Typewriter from 'typewriter-effect';

import styled from '@emotion/styled';

import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const heroStyles = () => ({
  typing: {
    color: '#2EA5E8',
  },
});

const useStyles = makeStyles(heroStyles);

const Title = styled(Typography)`
  font-weight: 500;
  margin-top: 75px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-top: 40px;
    text-align: center;
  }
`;

const Intro: FC = () => {
  const classes = useStyles();

  return (
    <Box mb={6}>
      <Title variant="h2" mb={2}>
        Welcome to Digi Pnyx DAO
      </Title>
      <Box>
        <Typography variant="subtitle1" mb={4}>
          Decentralized Autonomous Organization on Godwoken Mainnet (Nervos blockchain Layer 2).
        </Typography>
        <Box sx={{ height: { xs: '100px', sm: 'auto' } }}>
          <Typography variant="h2-bold" align="center">
            <Typewriter
              onInit={typewriter => {
                typewriter
                  .typeString('ALL OVER THE WORLD')
                  .pauseFor(1100)
                  .deleteChars(18)
                  .typeString('ON BLOCKCHAIN NETWORK')
                  .pauseFor(1100)
                  .deleteChars(21)
                  .start();
              }}
              options={{
                autoStart: true,
                loop: true,
                wrapperClassName: classes.typing,
              }}
            />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Intro;
