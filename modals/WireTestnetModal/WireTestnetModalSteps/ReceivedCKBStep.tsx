import React, { FC } from 'react';

import styled from '@emotion/styled';

import DAOButton from 'components/DAOButton/DAOButton';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface ReceivedCKBStepProps {
  handlePreviousStep: () => void;
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
    margin-top: 20px;
    width: 100%;
  }
`;

const NavButtonsWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const ReceivedCKBStep: FC<ReceivedCKBStepProps> = ({ handlePreviousStep, handleNextStep }) => {
  return (
    <Box mt={5} mb={4}>
      <StyledBox>
        <Box>
          <Typography component="h6" variant="h6" paragraph>
            Stake CKB via NexisDAO
          </Typography>
          <Typography component="h6">
            On NexisDAO Page, fill in the form field as much as you would like to deposit from your total balance, the
            tokens will be locked for 1 month and you will get an equivalent in dCKB, next press the Mint button.
          </Typography>
        </Box>
        <ButtonWrapper>
          <DAOButton
            variant="gradientOutline"
            onClick={() => window.open('https://aggron.nexisdao.com/dckb', '_blank')}
          >
            Stake CKB
          </DAOButton>
        </ButtonWrapper>
      </StyledBox>

      <NavButtonsWrapper>
        <Box width="48%">
          <DAOButton onClick={handlePreviousStep}>Previous step</DAOButton>
        </Box>
        <Box width="48%">
          <DAOButton variant="gradientOutline" onClick={handleNextStep}>
            Next step
          </DAOButton>
        </Box>
      </NavButtonsWrapper>
    </Box>
  );
};

export default ReceivedCKBStep;
