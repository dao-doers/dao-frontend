import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DAOButton from 'components/DAOButton/DAOButton';

import { EXTERNAL_ROUTES } from 'utils/routes';

import { selectbalanceSUDT } from 'redux/slices/user';

interface GetCKBStepProps {
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

const GetCKBStep: FC<GetCKBStepProps> = ({ handlePreviousStep, completeStep }) => {
  const balanceSUDT = useSelector(selectbalanceSUDT);
  return (
    <Box mt={5} mb={4}>
      <StyledBox>
        <Box>
          <Typography component="h6" variant="h6">
            Get Portal Wallet Layer 1 address
          </Typography>
          <Typography component="h6">
            Go to NexisDAO and connect with metamask. Next, copy CKB address (ckt...xxx) from top left of swap box.
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

      <StyledBox>
        <Box>
          <Typography component="h6" variant="h6">
            Get CKB from Layer 1
          </Typography>
          <Typography component="h6">
            Get CKB from Layer 1 faucet by pasting the Layer 1 address and clicking Claim.
          </Typography>
        </Box>
        <ButtonWrapper>
          <DAOButton variant="gradientOutline" onClick={() => window.open(EXTERNAL_ROUTES.NERVOS_FAUCET, '_blank')}>
            Layer 1 faucet
          </DAOButton>
        </ButtonWrapper>
      </StyledBox>

      <NavButtonsWrapper>
        <Box width="48%">
          <DAOButton onClick={handlePreviousStep}>Previous step</DAOButton>
        </Box>
        <Box width="48%">
          <DAOButton variant="gradientOutline" onClick={() => completeStep(balanceSUDT.ckbBalance)}>
            Next step
          </DAOButton>
        </Box>
      </NavButtonsWrapper>
    </Box>
  );
};

export default GetCKBStep;
