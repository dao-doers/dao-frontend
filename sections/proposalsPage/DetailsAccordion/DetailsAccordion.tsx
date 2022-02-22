import React, { FC, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import styled from '@emotion/styled';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import DAOTile from 'components/DAOTile/DAOTile';

import formatAddress from 'utils/formatAddress';
import { shannonsToCkb } from 'utils/formatShannons';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

const StyledAccordionDetails = styled(AccordionDetails)`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: 0;
  }
`;

const TypographyBold = styled(Typography)`
  font-weight: 600;
`;

const TypographyCursor = styled(Typography)`
  font-weight: 600;
  cursor: pointer;
`;

const StyledCopyIcon = styled(ContentCopyIcon)`
  cursor: pointer;
  font-size: 14px;
  position: relative;
  top: 3px;
  margin-left: 4px;
`;

const StyledExpandMoreIcon = styled(ExpandMoreIcon)`
  color: ${({ theme }) => theme.palette.text.primary};
`;

const DetailsAccordion: FC<any> = ({ proposal }) => {
  const [copiedSponsoredAddress, setCopiedSponsoredAddress] = useState(false);
  const [copiedApplicantAddress, setCopiedApplicantAddress] = useState(false);

  const handleCopySponsoredAddress = () => {
    setCopiedSponsoredAddress(true);
    setTimeout(() => {
      setCopiedSponsoredAddress(false);
    }, 1000);
  };

  const handleCopyApplicantAddress = () => {
    setCopiedApplicantAddress(true);
    setTimeout(() => {
      setCopiedApplicantAddress(false);
    }, 2000);
  };

  return (
    <StyledAccordion>
      <StyledAccordionSummary expandIcon={<StyledExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <TypographyBold variant="subtitle2">Poll Details</TypographyBold>
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        <Box display="flex" justifyContent="flex-start" flexWrap="wrap">
          {proposal.sponsored && (
            <Box sx={{ width: { xs: '48%', xl: '30%' } }} mb={2} mx="1%">
              <DAOTile variant="gradientOutline" width="100%" height="100px">
                <Box>
                  <Typography variant="body2" align="center" gutterBottom>
                    Sponsored by
                  </Typography>
                  <CopyToClipboard text={proposal.sponsor} onCopy={handleCopySponsoredAddress}>
                    <Box display="flex" justifyContent="center">
                      <TypographyCursor align="center">{formatAddress(proposal.applicant, 5, 5)}</TypographyCursor>
                      <StyledCopyIcon />
                    </Box>
                  </CopyToClipboard>
                </Box>
              </DAOTile>
            </Box>
          )}

          {proposal.applicant && (
            <Box sx={{ width: { xs: '48%', xl: '30%' } }} mb={2} mx="1%">
              <DAOTile variant="gradientOutline" width="100%" height="100px">
                <Box>
                  <Typography variant="body2" align="center" gutterBottom>
                    Applicant Address
                  </Typography>
                  <CopyToClipboard text={proposal.applicant} onCopy={handleCopyApplicantAddress}>
                    <Box display="flex" justifyContent="center">
                      <TypographyCursor align="center">{formatAddress(proposal.applicant, 5, 5)}</TypographyCursor>
                      <StyledCopyIcon />
                    </Box>
                  </CopyToClipboard>
                </Box>
              </DAOTile>
            </Box>
          )}

          {proposal.sharesRequested && (
            <Box sx={{ width: { xs: '48%', xl: '30%' } }} mb={2} mx="1%">
              <DAOTile variant="gradientOutline" width="100%" height="100px">
                <Box>
                  <Typography variant="body2" align="center" gutterBottom>
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
                  <Typography variant="body2" align="center" gutterBottom>
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
                  <Typography variant="body2" align="center" gutterBottom>
                    Payment Requested
                  </Typography>
                  <TypographyBold align="center">
                    {shannonsToCkb(proposal.paymentRequested)} {proposal.paymentTokenSymbol}
                  </TypographyBold>
                </Box>
              </DAOTile>
            </Box>
          )}

          <Snackbar open={copiedSponsoredAddress || copiedApplicantAddress}>
            <Alert severity="success" sx={{ width: '100%' }}>
              Address copied!
            </Alert>
          </Snackbar>
        </Box>
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default DetailsAccordion;
