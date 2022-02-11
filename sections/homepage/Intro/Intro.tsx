import React, { FC } from 'react';
import Typewriter from 'typewriter-effect';

import styled from '@emotion/styled';

import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const heroStyles = () => ({
  typing: {
    color: '#ED2391',
  },
});

const useStyles = makeStyles(heroStyles);

const Title = styled(Typography)`
  font-weight: 600;
  margin-top: 75px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-top: 0;
  }
`;

const TypographyBold = styled(Typography)`
  font-weight: 600;
`;

const Intro: FC = () => {
  const classes = useStyles();

  return (
    <Box>
      <Title variant="h2" paragraph>
        Welcome to Nervos DAO
      </Title>
      <Box>
        <Typography variant="h6">
          Decentralized Autonomous Organization introduced to the World by Nervos Foundation. Our mission is to spread
          true democracy.
        </Typography>
        <TypographyBold variant="h3" align="center" mt={4}>
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
        </TypographyBold>
      </Box>
    </Box>
  );
};

export default Intro;
