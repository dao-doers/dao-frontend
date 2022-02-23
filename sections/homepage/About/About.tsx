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

const About: FC = () => {
  return (
    <Box>
      <TypographyBold variant="h3" paragraph mt={8}>
        How does it works
      </TypographyBold>
      <ColumnsWrapper>
        <ColumnWrapper>
          <Box
            style={{ background: '#f09', backgroundImage: 'linear-gradient(45deg, #3023AE 0%, #f09 100%)' }}
            borderRadius="30% 70% 70% 30% / 30% 33% 67% 70%"
          >
            <Image src="/logos/vote_choice_icon.svg" alt="header-logo" height="200" width="200" />
          </Box>
          <Typography variant="subtitle2" mt={2}>
            Every person can request to join our guild which will allow you to take part in votings.
          </Typography>
        </ColumnWrapper>
        <ColumnWrapper>
          <Box
            style={{
              background: '#f09',
              backgroundImage: 'linear-gradient(45deg, #3023AE 0%, #f09 100%)',
            }}
            borderRadius="51% 49% 53% 47% / 86% 86% 14% 14%"
          >
            <Image src="/logos/vote_button_icon.svg" alt="header-logo" height="200" width="200" />
          </Box>
          <Typography variant="subtitle2" mt={2}>
            Every guild member can create his own proposal on which the community will vote.
          </Typography>
        </ColumnWrapper>
        <ColumnWrapper>
          <Box
            style={{
              background: '#f09',
              backgroundImage: 'linear-gradient(45deg, #3023AE 0%, #f09 100%)',
            }}
            borderRadius="55% 45% 54% 46% / 39% 53% 47% 61%"
          >
            <Image src="/logos/vote_magnifier_counting_icon.svg" alt="header-logo" height="200" width="200" />
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
