import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { selectbalanceSUDT } from 'redux/slices/user';

import styled from '@emotion/styled';

import DAOButton from 'components/DAOButton/DAOButton';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DividerLine from 'components/DividerLine/DividerLine';

interface ReceivedCKBStepProps {
  handlePreviousStep: () => void;
  completeStep: (form: any) => void;
}

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  justify-content: space-between;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;
    align-items: flex-start;
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

const ReceivedCKBStep: FC<ReceivedCKBStepProps> = ({ handlePreviousStep, completeStep }) => {
  const balanceSUDT = useSelector(selectbalanceSUDT);
  return (
    <Box mt={5} mb={4}>
      <DividerLine />
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
          <DAOButton
            variant="gradientOutline"
            onClick={() => {
              completeStep(balanceSUDT.ckbBalance);
            }}
          >
            Next step
          </DAOButton>
        </Box>
      </NavButtonsWrapper>
    </Box>
  );
};

export default ReceivedCKBStep;
