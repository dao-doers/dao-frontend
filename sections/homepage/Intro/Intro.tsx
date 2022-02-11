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

const TypographyBold = styled(Typography)`
  font-weight: 600;
`;

const Intro: FC = () => {
  const classes = useStyles();

  return (
    <Box>
      <TypographyBold variant="h3" paragraph mt={8}>
        Welcome to Nervos DAO
      </TypographyBold>
      <Box display="flex">
        <Typography component="span" variant="h6">
          Decentralized Autonomous Organization introduced to the World by Nervos Foundation. Our mission is to spread
          true democracy
          <Typewriter
            onInit={typewriter => {
              typewriter
                .typeString('all over the world.')
                .pauseFor(1100)
                .deleteChars(19)
                .typeString('on blockchain network.')
                .pauseFor(1100)
                .deleteChars(22)
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
  );
};

export default Intro;
