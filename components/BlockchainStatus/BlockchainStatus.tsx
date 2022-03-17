import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton';

import { selectIsLoggedIn } from 'redux/slices/user';

import useIsMobile from 'hooks/useIsMobile';

import BlockchainStatusContent from './BlockchainStatusContent/BlockchainStatusContent';

const MainWrapper = styled(Box)`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 30px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;
    margin-top: 0px;
  }
`;

const StatusWrapper = styled(Box)`
  margin-left: 16px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-bottom: 8px;
    margin-left: 0px;
  }
`;

const StyledAccordion = styled(Accordion)`
  background-color: transparent;
  box-shadow: none;
  border-top: none;
  &:before {
    display: none;
  }
`;

const StyledAccordionSummary = styled(AccordionSummary)`
  padding: 0;
`;

const StyledExpandMoreIcon = styled(ExpandMoreIcon)`
  color: ${({ theme }) => theme.palette.text.primary};
`;

const BlockchainStatus: FC = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isMobile = useIsMobile('md');

  return (
    <MainWrapper>
      {isMobile && (
        <StyledAccordion>
          <StyledAccordionSummary
            expandIcon={<StyledExpandMoreIcon />}
            aria-controls="blockchain-status-accordion"
            id="panel1a-header"
          >
            <Typography variant="body1-bold">Blockchain status details</Typography>
          </StyledAccordionSummary>
          <AccordionDetails>
            <BlockchainStatusContent />
          </AccordionDetails>
        </StyledAccordion>
      )}

      {!isMobile && <BlockchainStatusContent />}

      {!isLoggedIn && (
        <StatusWrapper>
          <ConnectWalletButton />
        </StatusWrapper>
      )}
    </MainWrapper>
  );
};

export default BlockchainStatus;
