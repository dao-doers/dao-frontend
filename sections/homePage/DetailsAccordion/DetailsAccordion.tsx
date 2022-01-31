import { FC } from 'react';

import styled from '@emotion/styled';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

import DAOTile from 'components/DAOTile/DAOTile';

import formatAddress from 'utils/formatAddress';
import { shannonsToCkb } from 'utils/formatShannons';

const StyledAccordion = styled(Accordion)`
  margin-top: 10px;
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

const TypographyBold = styled(Typography)`
  font-weight: 600;
`;

const StyledExpandMoreIcon = styled(ExpandMoreIcon)`
  color: ${({ theme }) => theme.palette.text.primary};
`;

const DetailsAccordion: FC<any> = ({ proposal }) => {
  return (
    <StyledAccordion>
      <StyledAccordionSummary expandIcon={<StyledExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <TypographyBold variant="h6">Poll Details</TypographyBold>
      </StyledAccordionSummary>
      <AccordionDetails>
        <Box display="flex" justifyContent="flex-start" flexWrap="wrap">
          {proposal.sponsored && (
            <Box sx={{ width: { xs: '48%', xl: '30%' } }} mb={2} mx="1%">
              <DAOTile variant="gradientOutline" width="100%" height="100px">
                <Box>
                  <Typography align="center" gutterBottom>
                    Sponsored by
                  </Typography>
                  <TypographyBold align="center">{formatAddress(proposal.sponsor)}</TypographyBold>
                </Box>
              </DAOTile>
            </Box>
          )}

          {proposal.applicant && (
            <Box sx={{ width: { xs: '48%', xl: '30%' } }} mb={2} mx="1%">
              <DAOTile variant="gradientOutline" width="100%" height="100px">
                <Box>
                  <Typography align="center" gutterBottom>
                    Applicant Address
                  </Typography>
                  <TypographyBold align="center">{formatAddress(proposal.applicant)}</TypographyBold>
                </Box>
              </DAOTile>
            </Box>
          )}

          {proposal.sharesRequested && (
            <Box sx={{ width: { xs: '48%', xl: '30%' } }} mb={2} mx="1%">
              <DAOTile variant="gradientOutline" width="100%" height="100px">
                <Box>
                  <Typography align="center" gutterBottom>
                    Shares Requested
                  </Typography>
                  <TypographyBold align="center">
                    {new Intl.NumberFormat('de-DE').format(proposal.sharesRequested)}
                  </TypographyBold>
                </Box>
              </DAOTile>
            </Box>
          )}

          {proposal.tributeOffered && (
            <Box sx={{ width: { xs: '48%', xl: '30%' } }} mb={2} mx="1%">
              <DAOTile variant="gradientOutline" width="100%" height="100px">
                <Box>
                  <Typography align="center" gutterBottom>
                    Tribute to DAO
                  </Typography>
                  <TypographyBold align="center">
                    {shannonsToCkb(proposal.tributeOffered)} {proposal.tributeTokenSymbol}
                  </TypographyBold>
                </Box>
              </DAOTile>
            </Box>
          )}

          {Number(proposal.paymentRequested) > 0 && (
            <Box sx={{ width: { xs: '48%', xl: '30%' } }} mb={2} mx="1%">
              <DAOTile variant="gradientOutline" width="100%" height="100px">
                <Box>
                  <Typography align="center" gutterBottom>
                    Payment Requested
                  </Typography>
                  <TypographyBold align="center">
                    {shannonsToCkb(proposal.paymentRequested)} {proposal.paymentTokenSymbol}
                  </TypographyBold>
                </Box>
              </DAOTile>
            </Box>
          )}
        </Box>
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default DetailsAccordion;
