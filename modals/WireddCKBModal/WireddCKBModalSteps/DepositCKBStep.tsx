import React, { FC } from 'react';

import styled from '@emotion/styled';

import DAOButton from 'components/DAOButton/DAOButton';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface DepositCKBStepProps {
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

const DepositCKBStep: FC<DepositCKBStepProps> = ({ handlePreviousStep, handleNextStep }) => {
  return (
    <Box mt={5} mb={4}>
      <StyledBox>
        <Box>
          <Typography component="h6" variant="h6" paragraph>
            Get Layer 1 dCKB
          </Typography>
          <Typography component="h6">
            On NexisDAO Page press the Mint button and deposit as much Layer 1 CKB as you would like to.
          </Typography>
        </Box>
        <ButtonWrapper>
          <DAOButton
            variant="gradientOutline"
            onClick={() => window.open('https://aggron.nexisdao.com/dckb', '_blank')}
          >
            Nexis DAO
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

export default DepositCKBStep;
