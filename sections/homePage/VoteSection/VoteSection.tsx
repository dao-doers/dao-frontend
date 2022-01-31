/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Accordion from '@mui/material/Accordion';
import Box from '@mui/material/Box';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import DividerLine from 'components/DividerLine/DividerLine';
import DAOButton from 'components/DAOButton/DAOButton';
import DAOTile from 'components/DAOTile/DAOTile';
import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton';
import DAOCircleLoader from 'components/DAOCircleLoader/DAOCircleLoader';
import Counter from 'components/Counter/Counter';
import TooltipIcon from 'components/TooltipIcon';

import VoteChart from 'sections/homePage/VoteChart/VoteChart';

import useSponsorProposal from 'hooks/useSponsorProposal';
import useVote from 'hooks/useVote';
import useNotVotedYetCheck from 'hooks/useNotVotedYetCheck';
import useProcessProposal from 'hooks/useProcessProposal';

import FETCH_STATUSES from 'enums/fetchStatuses';
import PROPOSAL_STATUS from 'enums/proposalStatus';

import { selectUserAddress } from 'redux/slices/user';

const StyledAccordion = styled(Accordion)`
  margin-top: 10px;
  background-color: transparent;
  box-shadow: none;
  border-top: none;
  &:before {
    display: none;
  }
`;

const VoteSectionWrapper = styled(Box)`
  display: flex;
  align-items: center;
  ${({ theme }) => `${theme.breakpoints.down('md')} {
    flex-direction: column;
    }`}
`;

const TypographyRose = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col2};
`;

const TypographyBlue = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col1};
`;

const TypographyBold = styled(Typography)`
  font-weight: 600;
`;

const TypographyViolet = styled(Typography)`
  font-weight: 600;
  margin-right: 10px;
  background: ${({ theme }) => theme.palette.gradients.grad2};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StyledExpandMoreIcon = styled(ExpandMoreIcon)`
  color: ${({ theme }) => theme.palette.text.primary};
`;

// TODO: component is too big, we should fragment it
const VoteSection: FC<any> = ({ proposal }) => {
  const userAddress = useSelector(selectUserAddress);

  const [sponsorProposalStatus, setSponsorProposalStatus] = useState(FETCH_STATUSES.IDLE);
  const [voteStatus, setVoteStatus] = useState(FETCH_STATUSES.IDLE);
  // 0 means idle state, 1 means user can vote, 2 means user already voted
  const [notVotedYet, setNotVotedYet] = useState(0);
  const [processProposalStatus, setProcessProposalStatus] = useState(FETCH_STATUSES.IDLE);

  const currentTime = new Date().getTime() / 1000;

  const handleSponsorProposal = async () => {
    const daoAddress = process.env.DAO_ADDRESS;
    const { proposalId } = proposal;

    try {
      setSponsorProposalStatus(FETCH_STATUSES.LOADING);
      await useSponsorProposal(userAddress, daoAddress, proposalId);
      setSponsorProposalStatus(FETCH_STATUSES.SUCCESS);
    } catch (error) {
      setSponsorProposalStatus(FETCH_STATUSES.ERROR);
    }
  };

  const handleVote = async (vote: number) => {
    // TODO: improvement - useNotVotedYetCheck should run just right after page render, not just after clicking
    setVoteStatus(FETCH_STATUSES.LOADING);
    await useNotVotedYetCheck(userAddress, proposal.proposalIndex, process.env.DAO_ADDRESS as any).then(
      async response => {
        if (response === true) {
          setNotVotedYet(1);
          const daoAddress = process.env.DAO_ADDRESS;
          const { proposalIndex } = proposal;

          try {
            await useVote(proposalIndex, vote, userAddress, daoAddress);
            setVoteStatus(FETCH_STATUSES.SUCCESS);
          } catch (error) {
            setVoteStatus(FETCH_STATUSES.ERROR);
          }
        } else {
          setNotVotedYet(2);
          setVoteStatus(FETCH_STATUSES.IDLE);
        }
      },
    );
  };

  const handleProcessProposal = async () => {
    const daoAddress = process.env.DAO_ADDRESS;
    const { proposalIndex } = proposal;
    setProcessProposalStatus(FETCH_STATUSES.LOADING);

    try {
      const receipt = await useProcessProposal(userAddress, daoAddress, proposalIndex);
      if (receipt.transactionHash) {
        setProcessProposalStatus(FETCH_STATUSES.SUCCESS);
      } else {
        setProcessProposalStatus(FETCH_STATUSES.ERROR);
      }
    } catch (error) {
      setProcessProposalStatus(FETCH_STATUSES.ERROR);
    }
  };

  return (
    <StyledAccordion>
      <AccordionSummary expandIcon={<StyledExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          <TypographyBold variant="h6">Vote Section</TypographyBold>
          {proposal.proposalStatus === PROPOSAL_STATUS.COLLECTING_FUNDS && (
            <TypographyViolet>Collecting Funds</TypographyViolet>
          )}
          {proposal.proposalStatus === PROPOSAL_STATUS.VOTING && <TypographyViolet>Voting</TypographyViolet>}
          {proposal.proposalStatus === PROPOSAL_STATUS.GRACE_PERIOD && (
            <TypographyViolet>Grace Period</TypographyViolet>
          )}
          {proposal.proposalStatus === PROPOSAL_STATUS.PROCEEDING && <TypographyViolet>Proceeding</TypographyViolet>}
          {proposal.proposalStatus === PROPOSAL_STATUS.FINISHED && <TypographyViolet>Finished</TypographyViolet>}
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        {proposal.proposalStatus === PROPOSAL_STATUS.COLLECTING_FUNDS && (
          <DAOTile>
            <Box width="100%" p={2}>
              {sponsorProposalStatus !== FETCH_STATUSES.SUCCESS && (
                <Typography align="center" mb={2}>
                  This proposal has not been sponsored yet. It can be sponsored by DAO member.
                </Typography>
              )}

              {userAddress === '' && (
                <Box maxWidth="200px" mx="auto">
                  <ConnectWalletButton />
                </Box>
              )}

              {userAddress !== '' && sponsorProposalStatus !== FETCH_STATUSES.SUCCESS && (
                <Box maxWidth="200px" mx="auto">
                  <DAOButton
                    variant="gradientOutline"
                    isLoading={sponsorProposalStatus === FETCH_STATUSES.LOADING}
                    onClick={handleSponsorProposal}
                    disabled={sponsorProposalStatus === FETCH_STATUSES.LOADING}
                  >
                    Sponsor Proposal
                  </DAOButton>
                </Box>
              )}

              {sponsorProposalStatus === FETCH_STATUSES.SUCCESS && (
                <DAOTile variant="gradientOutline">
                  <Typography align="center" p={1}>
                    You have successfully sponsored this proposal!
                  </Typography>
                </DAOTile>
              )}
            </Box>
          </DAOTile>
        )}

        {(proposal.proposalStatus === PROPOSAL_STATUS.VOTING ||
          proposal.proposalStatus === PROPOSAL_STATUS.GRACE_PERIOD ||
          proposal.proposalStatus === PROPOSAL_STATUS.PROCEEDING) && (
          <VoteSectionWrapper>
            <Box sx={{ width: { xs: '100%', md: '70%' } }} p={2}>
              <Box>
                {currentTime <= proposal.votingPeriodEnds && (
                  <>
                    <Typography variant="h6" mb={3}>
                      Your Vote
                    </Typography>

                    {userAddress === '' && (
                      <Box maxWidth="200px" mx="auto" mb={3}>
                        <ConnectWalletButton />
                      </Box>
                    )}

                    {userAddress !== '' &&
                      voteStatus !== FETCH_STATUSES.LOADING &&
                      voteStatus !== FETCH_STATUSES.SUCCESS &&
                      notVotedYet !== 2 && (
                        <Box display="flex" justifyContent="space-between" mb={3}>
                          <Box width="48%">
                            <DAOButton variant="agreeVariant" onClick={() => handleVote(1)}>
                              Yes
                            </DAOButton>
                          </Box>
                          <Box width="48%">
                            <DAOButton variant="disagreeVariant" onClick={() => handleVote(2)}>
                              No
                            </DAOButton>
                          </Box>
                        </Box>
                      )}

                    {voteStatus === FETCH_STATUSES.LOADING && (
                      <DAOTile variant="gradientOutline">
                        <Box display="flex" alignItems="center" py={1}>
                          <Box display="flex" alignItems="center" mr={2}>
                            <DAOCircleLoader size={20} />
                          </Box>
                          Processing...
                        </Box>
                      </DAOTile>
                    )}

                    {voteStatus === FETCH_STATUSES.ERROR && (
                      <DAOTile variant="redOutline">
                        <Box display="flex" alignItems="center" py={1}>
                          Something went wrong, please try again.
                        </Box>
                      </DAOTile>
                    )}

                    {voteStatus === FETCH_STATUSES.SUCCESS && (
                      <DAOTile variant="gradientOutline">
                        <Typography align="center" p={1}>
                          You have successfully voted!
                        </Typography>
                      </DAOTile>
                    )}

                    {notVotedYet === 2 && (
                      <DAOTile variant="redOutline">
                        <Typography align="center" p={1}>
                          You have already voted!
                        </Typography>
                      </DAOTile>
                    )}
                  </>
                )}

                {currentTime > proposal.votingPeriodEnds && currentTime < proposal.gracePeriodEnds && (
                  <DAOTile variant="gradientOutline">
                    <Typography align="center" p={1}>
                      Proposal is in Grace Period.
                      <TooltipIcon>
                        <Typography variant="body2">
                          Voting is over, and the Proposal is set to pass or fail depending on the votes cast during
                          Voting. Members who voted No, and have no other pending Yes votes, can ragequit during this
                          period
                        </Typography>
                      </TooltipIcon>
                    </Typography>
                  </DAOTile>
                )}

                {currentTime > proposal.votingPeriodEnds && currentTime > proposal.gracePeriodEnds && (
                  <>
                    <Typography mb={1}>To finish the whole process proposal needs to be proceed.</Typography>

                    {userAddress === '' && (
                      <Box maxWidth="200px" mx="auto" mb={3}>
                        <ConnectWalletButton />
                      </Box>
                    )}

                    {userAddress !== '' && processProposalStatus !== FETCH_STATUSES.SUCCESS && (
                      <DAOButton
                        variant="gradientOutline"
                        isLoading={processProposalStatus === FETCH_STATUSES.LOADING}
                        onClick={handleProcessProposal}
                      >
                        Process Proposal
                      </DAOButton>
                    )}

                    {processProposalStatus === FETCH_STATUSES.ERROR && (
                      <Box mt={1}>
                        <DAOTile variant="redOutline">
                          <Typography align="center" p={1}>
                            Proposal is not ready to be processed by blockchain network.
                          </Typography>
                        </DAOTile>
                      </Box>
                    )}

                    {processProposalStatus === FETCH_STATUSES.SUCCESS && (
                      <DAOTile variant="gradientOutline">
                        <Typography align="center" p={1}>
                          Proposal is beeing processed by blockchain network.
                        </Typography>
                      </DAOTile>
                    )}
                  </>
                )}
              </Box>

              <DividerLine />

              {currentTime <= proposal.votingPeriodEnds && (
                <Box display="flex" justifyContent="space-between" width="100%" pb={2}>
                  <Typography width="100%">Voting Ends In</Typography>
                  <Counter time={Number(proposal.votingPeriodEnds)} />
                </Box>
              )}
              {currentTime > proposal.votingPeriodEnds && currentTime < proposal.gracePeriodEnds && (
                <Box display="flex" justifyContent="space-between" width="100%" pb={2}>
                  <Typography width="100%">Grace Period Ends In</Typography>
                  <Counter time={Number(proposal.gracePeriodEnds)} />
                </Box>
              )}
              <Box display="flex" justifyContent="space-between" width="100%" pb={2}>
                <Typography>Voters Agreed</Typography>
                <TypographyRose>{proposal.yesShares}</TypographyRose>
              </Box>
              <Box display="flex" justifyContent="space-between" width="100%" pb={2}>
                <Typography>Voters Disagreed</Typography>
                <TypographyBlue>{proposal.noShares}</TypographyBlue>
              </Box>
            </Box>
            <Box sx={{ width: { xs: '200px', md: '30%' } }} px={2} pb={2}>
              <VoteChart agreed={proposal.yesShares} disagreed={proposal.noShares} />
            </Box>
          </VoteSectionWrapper>
        )}

        {proposal.proposalStatus === PROPOSAL_STATUS.FINISHED && (
          <>
            {proposal.didPass === true && (
              <DAOTile variant="greenBackground">
                <Typography align="center" p={1}>
                  Proposal has been approved.
                </Typography>
              </DAOTile>
            )}
            {proposal.didPass === false && (
              <DAOTile variant="redBackground">
                <Typography align="center" p={1}>
                  Proposal has been rejected.
                </Typography>
              </DAOTile>
            )}

            <Box
              display="flex"
              alignItems="center"
              sx={{ flexDirection: { xs: 'column', md: 'row' }, mt: { xs: 4, md: 0 } }}
            >
              <Box sx={{ width: { xs: '100%', md: '70%' } }}>
                <Box display="flex" justifyContent="space-between" width="100%" pb={2}>
                  <Typography>Voters Agreed</Typography>
                  <TypographyRose>{proposal.yesShares}</TypographyRose>
                </Box>
                <Box display="flex" justifyContent="space-between" width="100%" pb={2}>
                  <Typography>Voters Disagreed</Typography>
                  <TypographyBlue>{proposal.noShares}</TypographyBlue>
                </Box>
              </Box>
              <Box sx={{ width: { xs: '150px', md: '30%' } }} px={2} pb={2}>
                <VoteChart agreed={proposal.yesShares} disagreed={proposal.noShares} />
              </Box>
            </Box>
          </>
        )}
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default VoteSection;
