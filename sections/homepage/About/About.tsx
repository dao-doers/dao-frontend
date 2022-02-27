import React, { FC } from 'react';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Image from 'next/image';

const ColumnsWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;

const ColumnWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  margin-top: 20px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
  }
`;

const TypographyBold = styled(Typography)`
  font-weight: 600;
`;
const gradient = 'linear-gradient(45deg, #2EA5E8 0%, #00D395 100%)';
const About: FC = () => {
  return (
    <Box>
      <TypographyBold variant="h3" paragraph mt={8}>
        How does it works
      </TypographyBold>
      <ColumnsWrapper>
        <ColumnWrapper>
          <Box
            style={{ background: 'transparent' }}
            borderRadius="55% /30%"
            borderBottom="8px solid"
            borderColor="#383838"
          >
            <Image src="/logos/vote_screen_icon.svg" alt="header-logo" height="150" width="150" />
          </Box>
          <Typography variant="subtitle2" mt={2}>
            Every person can request to join our guild which will allow you to take part in votings.
          </Typography>
        </ColumnWrapper>
        <ColumnWrapper>
          <Box
            style={{
              background: 'transparent',
            }}
            borderBottom="8px solid"
            borderColor="#383838"
          >
            <Image src="/logos/vote_online_icon.svg" alt="header-logo" height="150" width="150" />
          </Box>
          <Typography variant="subtitle2" mt={2}>
            Every guild member can create his own proposal on which the community will vote.
          </Typography>
        </ColumnWrapper>
        <ColumnWrapper>
          <Box
            style={{
              background: 'transparent',
            }}
            borderRadius="55% 45% 54% 46% / 39% 53% 47% 61%"
            border="8px solid"
            borderColor="#383838"
          >
            <Image src="/logos/vote_magnifier_counting_icon.svg" alt="header-logo" height="150" width="150" />
          </Box>
          <Typography variant="subtitle2" mt={2}>
            Once the proposal is approved, it goes to the execution phase.
          </Typography>
        </ColumnWrapper>
      </ColumnsWrapper>
    </Box>
  );
};

export default About;
