import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { selectbalanceSUDT } from 'redux/slices/user';

import styled from '@emotion/styled';

import DAOButton from 'components/DAOButton/DAOButton';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDCKBTokenHook } from 'hooks/DCKBTokenHook';
import DAOCircleLoader from 'components/DAOCircleLoader/DAOCircleLoader';
import DividerLine from 'components/DividerLine/DividerLine';

interface DepositCKBStepProps {
  handlePreviousStep: () => void;
  completeStep: (form: any) => void;
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

const TypographyGreen = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col2};
  font-weight: 600;
`;

const DepositCKBStep: FC<DepositCKBStepProps> = ({ handlePreviousStep, completeStep }) => {
  const balanceSUDT = useSelector(selectbalanceSUDT);
  const { loaderBalance } = useDCKBTokenHook();
  return (
    <Box mt={5} mb={4}>
      {!loaderBalance ? (
        <Box display="flex" alignItems="center" pb={2}>
          <Typography variant="body1-bold" pr={1}>
            dCKB balance:
          </Typography>
          <TypographyGreen>
            {balanceSUDT.dckbBalance > 471 ? balanceSUDT.dckbBalance : 'mint some on NexisDAO Page'}
          </TypographyGreen>
        </Box>
      ) : (
        <DAOCircleLoader size={20} />
      )}
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

export default DepositCKBStep;
