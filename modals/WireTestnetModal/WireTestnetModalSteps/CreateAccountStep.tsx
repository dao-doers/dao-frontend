import React, { FC } from 'react';

import styled from '@emotion/styled';

import DAOButton from 'components/DAOButton/DAOButton';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface CreateAccountStepProps {
  handleNextStep: () => void;
}

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

const CreateAccountStep: FC<CreateAccountStepProps> = ({ handleNextStep }) => {
  return (
    <Box mt={5} mb={4}>
      <StyledBox>
        <Box>
          <Typography component="h6" variant="h6" paragraph>
            Create account on Nervos Layer 2
          </Typography>
          <Typography component="h6">
            You will be taken to an external page where you will be able to create your account address on Layer 2.
          </Typography>
        </Box>
        <ButtonWrapper>
          <DAOButton
            variant="gradientOutline"
            onClick={() => window.open('https://dev.ckb.tools/create-layer2-account', '_blank')}
          >
            Create account
          </DAOButton>
        </ButtonWrapper>
      </StyledBox>

      <StyledBox>
        <Box>
          <Typography component="h6" variant="h6">
            Already have a Nervos Layer 2 account.
          </Typography>
        </Box>
        <ButtonWrapper>
          <DAOButton variant="gradientOutline" onClick={handleNextStep}>
            Next step
          </DAOButton>
        </ButtonWrapper>
      </StyledBox>
    </Box>
  );
};

export default CreateAccountStep;
