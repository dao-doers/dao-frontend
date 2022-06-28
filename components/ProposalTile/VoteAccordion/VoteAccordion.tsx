import { FC } from 'react';

import styled from '@emotion/styled';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

import PROPOSAL_STATUS from 'enums/proposalStatus';

import CollectingFunds from './CollectingFunds/CollectingFunds';
import Voting from './Voting/Voting';
import GracePeriod from './GracePeriod/GracePeriod';
import Proceeding from './Proceeding/Proceeding';
import Finished from './Finished/Finished';
import VotesLinearCharts from './VotesLinearCharts/VotesLinearCharts';

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

const TypographyGreenBold = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col2};
  font-weight: 500;
`;

const TypographyRedBold = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col4};
  font-weight: 500;
`;

const GradientTypography = styled(Typography)`
  font-weight: 500;
  margin-right: 10px;
  background: ${({ theme }) => theme.palette.gradients.grad2};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StyledExpandMoreIcon = styled(ExpandMoreIcon)`
  color: ${({ theme }) => theme.palette.text.primary};
`;

const VoteAccordion: FC<any> = ({ proposal }) => {
  return (
    <StyledAccordion>
      <StyledAccordionSummary expandIcon={<StyledExpandMoreIcon />} aria-controls="vote-accordion" id="panel1a-header">
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          <Typography variant="subtitle2-bold">Vote Section</Typography>
          {proposal.proposalStatus === PROPOSAL_STATUS.COLLECTING_FUNDS && (
            <GradientTypography>Collecting Funds</GradientTypography>
          )}
          {proposal.proposalStatus === PROPOSAL_STATUS.VOTING && <GradientTypography>Voting</GradientTypography>}
          {proposal.proposalStatus === PROPOSAL_STATUS.GRACE_PERIOD && (
            <GradientTypography>Grace Period</GradientTypography>
          )}
          {proposal.proposalStatus === PROPOSAL_STATUS.PROCEEDING && (
            <GradientTypography>Proceeding</GradientTypography>
          )}
          {proposal.proposalStatus === PROPOSAL_STATUS.FINISHED && (
            <Box display="flex">
              {proposal.didPass === false && <TypographyRedBold mr={1.5}>Rejected</TypographyRedBold>}
              {proposal.didPass === true && <TypographyGreenBold mr={1.5}>Approved</TypographyGreenBold>}
            </Box>
          )}
        </Box>
      </StyledAccordionSummary>

      <AccordionDetails>
        {proposal.proposalStatus === PROPOSAL_STATUS.COLLECTING_FUNDS && (
          <CollectingFunds proposalId={proposal.proposalId} />
        )}

        {proposal.proposalStatus === PROPOSAL_STATUS.VOTING && (
          <>
            <Voting proposalIndex={proposal.proposalIndex} votingPeriodEnds={proposal.votingPeriodEnds} />
            <VotesLinearCharts yesVotes={proposal.yesVotes} noVotes={proposal.noVotes} />
          </>
        )}

        {proposal.proposalStatus === PROPOSAL_STATUS.GRACE_PERIOD && (
          <>
            <GracePeriod votingPeriodEnds={proposal.votingPeriodEnds} gracePeriodEnds={proposal.gracePeriodEnds} />
            <VotesLinearCharts yesVotes={proposal.yesVotes} noVotes={proposal.noVotes} />
          </>
        )}

        {/* TODO: does anyone can process proposal?  */}
        {proposal.proposalStatus === PROPOSAL_STATUS.PROCEEDING && (
          <>
            <Proceeding
              votingPeriodEnds={proposal.votingPeriodEnds}
              gracePeriodEnds={proposal.gracePeriodEnds}
              guildkick={proposal.guildkick}
              proposalIndex={proposal.proposalIndex}
            />
            <Box mt={2}>
              <VotesLinearCharts yesVotes={proposal.yesVotes} noVotes={proposal.noVotes} />
            </Box>
          </>
        )}

        {proposal.proposalStatus === PROPOSAL_STATUS.FINISHED && (
          <>
            <Finished didPass={proposal.didPass} />

            <Box mt={2}>
              <VotesLinearCharts yesVotes={proposal.yesVotes} noVotes={proposal.noVotes} />
            </Box>
          </>
        )}
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default VoteAccordion;
