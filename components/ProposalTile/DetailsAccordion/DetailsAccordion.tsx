import React, { FC, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import styled from '@emotion/styled';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';

import DAOTile from 'components/DAOTile/DAOTile';

import formatAddress from 'utils/formatAddress';
import { shannonsToCkb } from 'utils/formatShannons';

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

const TypographyCursor = styled(Typography)`
  font-weight: 500;
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

const GradientTypography = styled(Typography)`
  font-weight: 500;
  margin-right: 10px;
  background: ${({ theme }) => theme.palette.gradients.grad2};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
      <StyledAccordionSummary
        expandIcon={<StyledExpandMoreIcon />}
        aria-controls="deails-accordion"
        id="panel1a-header"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          <Typography variant="subtitle2-bold">Poll Details</Typography>
          {proposal.guildkick === false && Number(proposal.paymentRequested) === 0 && (
            <GradientTypography>Member Request</GradientTypography>
          )}
          {proposal.guildkick === false && Number(proposal.paymentRequested) > 0 && (
            <GradientTypography>Funding Request</GradientTypography>
          )}
          {proposal.guildkick === true && <GradientTypography>Guild Kick</GradientTypography>}
        </Box>
      </StyledAccordionSummary>

      <StyledAccordionDetails>
        <Box display="flex" justifyContent="flex-start" flexWrap="wrap">
          <Box sx={{ width: { xs: '48%', xl: '30%' } }} mb={2} mx="1%">
            <DAOTile variant="gradientOutline" width="100%" height="100px">
              <Box>
                <Typography variant="body2" align="center" gutterBottom>
                  Created by
                </Typography>
                <CopyToClipboard text={proposal.sponsor} onCopy={handleCopySponsoredAddress}>
                  <Box display="flex" justifyContent="center">
                    <TypographyCursor align="center">{formatAddress(proposal.proposer, 5, 5)}</TypographyCursor>
                    <StyledCopyIcon />
                  </Box>
                </CopyToClipboard>
              </Box>
            </DAOTile>
          </Box>

          {proposal.sponsored && (
            <Box sx={{ width: { xs: '48%', xl: '30%' } }} mb={2} mx="1%">
              <DAOTile variant="gradientOutline" width="100%" height="100px">
                <Box>
                  <Typography variant="body2" align="center" gutterBottom>
                    Sponsored by
                  </Typography>
                  <CopyToClipboard text={proposal.sponsor} onCopy={handleCopySponsoredAddress}>
                    <Box display="flex" justifyContent="center">
                      <TypographyCursor align="center">{formatAddress(proposal.sponsor, 5, 5)}</TypographyCursor>
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
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Typography variant="body2" gutterBottom>
                    Shares Requested
                  </Typography>
                  <Typography variant="body1-bold">
                    {new Intl.NumberFormat('de-DE').format(proposal.sharesRequested)}
                  </Typography>
                </Box>
              </DAOTile>
            </Box>
          )}

          {proposal.tributeOffered && (
            <Box sx={{ width: { xs: '48%', xl: '30%' } }} mb={2} mx="1%">
              <DAOTile variant="gradientOutline" width="100%" height="100px">
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Typography variant="body2" gutterBottom>
                    Tribute to DAO
                  </Typography>
                  <Typography variant="body1-bold">
                    {proposal.tributeOffered} {proposal.tributeTokenSymbol}
                  </Typography>
                </Box>
              </DAOTile>
            </Box>
          )}

          {Number(proposal.paymentRequested) > 0 && (
            <Box sx={{ width: { xs: '48%', xl: '30%' } }} mb={2} mx="1%">
              <DAOTile variant="gradientOutline" width="100%" height="100px">
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Typography variant="body2" gutterBottom>
                    Payment Requested
                  </Typography>
                  <Typography variant="body1-bold">
                    {proposal.paymentRequested} {proposal.paymentTokenSymbol}
                  </Typography>
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
