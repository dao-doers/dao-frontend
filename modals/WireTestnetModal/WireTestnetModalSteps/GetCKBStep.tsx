import React, { FC } from 'react';

import styled from '@emotion/styled';

import DAOButton from 'components/DAOButton/DAOButton';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;

const ButtonWrapper = styled(Box)`
  height: 40px;
  min-width: 160px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-top: 15px;
  }
`;

const GetCKBStep: FC = () => {
  return (
    <Box mt={5} mb={4}>
      <StyledBox>
        <Box>
          <Typography component="h6" variant="h6" paragraph>
            Get CKB from Layer 1
          </Typography>
          <Typography component="h6">
            Go to NexisDAO and connect with metamask. Next, copy CKB address (copy button here or) from top left of
            NexisDAO page. Get CKB from Layer 1 faucet (https://faucet.nervos.org/) by pasting the CKB address from step
            one NexisDAO page Get CKB from Layer 1 faucet by pasting the CKB address from NexisDAO page
          </Typography>
        </Box>
        <ButtonWrapper>
          <DAOButton variant="gradientOutline" onClick={() => window.open('https://faucet.nervos.org/', '_blank')}>
            Layer 1 faucet
          </DAOButton>
        </ButtonWrapper>
      </StyledBox>

      <StyledBox>
        <Box>
          <Typography component="h6" variant="h6" paragraph>
            Get CKB from Layer 1 faucet by pasting the CKB address from NexisDAO page
          </Typography>
        </Box>
      </StyledBox>
    </Box>
  );
};

export default GetCKBStep;
