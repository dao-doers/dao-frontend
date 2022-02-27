import React, { FC } from 'react';
import Typewriter from 'typewriter-effect';

import styled from '@emotion/styled';

import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Link from 'components/Link';
import DAOButton from 'components/DAOButton/DAOButton';

import { APP_ROUTES } from 'utils/routes';

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

const TitleReadyToBegin = styled(Typography)`
  font-weight: 600;
  margin-top: 20px;
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
      <Title variant="h2" align="center" mb={2}>
        Your DAO world, all in one place.
      </Title>
      <Box>
        <Box mx="auto" my={3} sx={{ width: { xs: '60%', md: '50%' } }}>
          <Typography variant="subtitle1" align="center">
            Decentralized Autonomous Organization introduced to the World by Nervos Foundation. Our mission is to spread
            true democracy.
          </Typography>
        </Box>
        <TypographyBold variant="h2" align="center">
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
        <TitleReadyToBegin variant="h3" align="center" pt={2}>
          Ready to begin?
        </TitleReadyToBegin>
        <Box mx="auto" my={2} sx={{ width: { xs: '60%', md: '30%' } }}>
          <Link internal href={APP_ROUTES.CREATE}>
            <DAOButton variant="gradientOutline">
              <Typography>Create Proposal</Typography>
            </DAOButton>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Intro;
