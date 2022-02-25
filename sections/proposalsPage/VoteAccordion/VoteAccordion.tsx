/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import Accordion from '@mui/material/Accordion';
import Box from '@mui/material/Box';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

import DividerLine from 'components/DividerLine/DividerLine';
import DAOButton from 'components/DAOButton/DAOButton';
import DAOTile from 'components/DAOTile/DAOTile';
import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton';
import Counter from 'components/Counter/Counter';
import TooltipIcon from 'components/TooltipIcon';

import LinearChart from 'components/LinearChart/LinearChart';

import { selectUserAddress, selectIsLoggedIn, selectUserShares } from 'redux/slices/user';
import { setOpen, setStatus, setMessage } from 'redux/slices/modalTransaction';

import useSponsorProposal from 'hooks/useSponsorProposal';
import useVote from 'hooks/useVote';
import useNotVotedYetCheck from 'hooks/useNotVotedYetCheck';
import useProcessProposal from 'hooks/useProcessProposal';

import FETCH_STATUSES from 'enums/fetchStatuses';
import PROPOSAL_STATUS from 'enums/proposalStatus';
import PROCESSING_STATUSES from 'enums/processingStatuses';

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

const TypographyGreen = styled(Typography)`
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

// TODO: component is waaaay too big, we should fragment it
const VoteAccordion: FC<any> = ({ proposal }) => {
  const dispatch = useDispatch();

  const userAddress = useSelector(selectUserAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userShares = useSelector(selectUserShares);

  const [sponsorProposalStatus, setSponsorProposalStatus] = useState(PROCESSING_STATUSES.IDLE);
  // 0 means idle state, 1 means user can vote, 2 means user already voted
  const [notVotedYet, setNotVotedYet] = useState(0);
  const [processProposalStatus, setProcessProposalStatus] = useState(FETCH_STATUSES.IDLE);

  const currentTime = new Date().getTime() / 1000;

  useEffect(() => {
    if (isLoggedIn && userShares > 0 && proposal.proposalIndex !== null) {
      useNotVotedYetCheck(userAddress, proposal.proposalIndex, process.env.DAO_ADDRESS as any).then(async response => {
        if (response === true) {
          setNotVotedYet(1);
        } else {
          setNotVotedYet(2);
        }
      });
    }
  }, [userAddress, isLoggedIn, proposal, process.env.DAO_ADDRESS]);

  const handleSponsorProposal = async () => {
    const daoAddress = process.env.DAO_ADDRESS;
    const { proposalId } = proposal;

    try {
      dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
      dispatch(setOpen(true));

      const receipt = await useSponsorProposal(userAddress, daoAddress, proposalId);

      console.log(receipt);

      dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));
      setSponsorProposalStatus(PROCESSING_STATUSES.SUCCESS);
      dispatch(
        setMessage(`Your request has been processed by blockchain network and will be displayed with the block number 
      ${receipt.blockNumber + 1}`),
      );
    } catch (error) {
      dispatch(setStatus(PROCESSING_STATUSES.ERROR));
    }
  };

  const handleVote = async (vote: number) => {
    // TODO: improvement - useNotVotedYetCheck should run just right after page render, not just after clicking

    dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
    dispatch(setOpen(true));

    await useNotVotedYetCheck(userAddress, proposal.proposalIndex, process.env.DAO_ADDRESS as any).then(
      async response => {
        if (response === true) {
          setNotVotedYet(1);
          const daoAddress = process.env.DAO_ADDRESS;
          const { proposalIndex } = proposal;

          try {
            await useVote(proposalIndex, vote, userAddress, daoAddress);
            dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));
          } catch (error) {
            dispatch(setStatus(PROCESSING_STATUSES.ERROR));
          }
        } else {
          setNotVotedYet(2);
          dispatch(setMessage('You have already voted!'));
          dispatch(setStatus(PROCESSING_STATUSES.ERROR));
        }
      },
    );
  };

  const handleProcessProposal = async () => {
    const daoAddress = process.env.DAO_ADDRESS;
    const { proposalIndex } = proposal;
    dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
    dispatch(setOpen(true));

    try {
      const receipt = await useProcessProposal(userAddress, daoAddress, proposalIndex);

      if (receipt.transactionHash) {
        setProcessProposalStatus(FETCH_STATUSES.SUCCESS);
        dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));
      } else {
        setProcessProposalStatus(FETCH_STATUSES.ERROR);
        dispatch(setStatus(PROCESSING_STATUSES.ERROR));
      }
    } catch (error) {
      setProcessProposalStatus(FETCH_STATUSES.ERROR);
      dispatch(setStatus(PROCESSING_STATUSES.ERROR));
    }
  };

  return (
    <StyledAccordion>
      <StyledAccordionSummary expandIcon={<StyledExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          <TypographyBold variant="subtitle2">Vote Section</TypographyBold>
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
      </StyledAccordionSummary>

      <AccordionDetails>
        {proposal.proposalStatus === PROPOSAL_STATUS.COLLECTING_FUNDS && (
          <DAOTile>
            <Box width="100%" p={2}>
              {sponsorProposalStatus !== PROCESSING_STATUSES.SUCCESS && (
                <DAOTile variant="greyOutline">
                  <Typography align="center" p={1}>
                    This proposal has not been sponsored yet. It can be sponsored by DAO member.
                  </Typography>
                </DAOTile>
              )}

              {sponsorProposalStatus === PROCESSING_STATUSES.SUCCESS && (
                <DAOTile variant="gradientOutline">
                  <Typography align="center" p={1}>
                    You have successfully sponsored this proposal!
                  </Typography>
                </DAOTile>
              )}

              {!isLoggedIn && (
                <Box maxWidth="200px" mx="auto" mt={2}>
                  <ConnectWalletButton />
                </Box>
              )}

              {isLoggedIn && sponsorProposalStatus !== PROCESSING_STATUSES.SUCCESS && (
                <Box maxWidth="200px" mx="auto" mt={2}>
                  <DAOButton variant="gradientOutline" onClick={handleSponsorProposal}>
                    Sponsor Proposal
                  </DAOButton>
                </Box>
              )}
            </Box>
          </DAOTile>
        )}

        {(proposal.proposalStatus === PROPOSAL_STATUS.VOTING ||
          proposal.proposalStatus === PROPOSAL_STATUS.GRACE_PERIOD ||
          proposal.proposalStatus === PROPOSAL_STATUS.PROCEEDING) && (
          <Box>
            <Box>
              {currentTime <= proposal.votingPeriodEnds && (
                <>
                  <Typography variant="h6" mb={3}>
                    Your Vote
                  </Typography>

                  {!isLoggedIn && (
                    <Box maxWidth="200px" mx="auto" mb={3}>
                      <ConnectWalletButton />
                    </Box>
                  )}

                  {isLoggedIn && notVotedYet !== 2 && (
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
                        period.
                      </Typography>
                    </TooltipIcon>
                  </Typography>
                </DAOTile>
              )}

              {currentTime > proposal.votingPeriodEnds && currentTime > proposal.gracePeriodEnds && (
                <>
                  <DAOTile variant="greyOutline">
                    <Typography align="center" p={1}>
                      To finish the whole process, proposal needs to be processed.
                    </Typography>
                  </DAOTile>

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
                        Proposal has been processed by blockchain network.
                      </Typography>
                    </DAOTile>
                  )}

                  {!isLoggedIn && (
                    <Box maxWidth="200px" mx="auto" mt={2}>
                      <ConnectWalletButton />
                    </Box>
                  )}

                  {isLoggedIn && processProposalStatus !== FETCH_STATUSES.SUCCESS && (
                    <Box maxWidth="200px" mx="auto" mt={2}>
                      <DAOButton variant="gradientOutline" onClick={handleProcessProposal}>
                        Process Proposal
                      </DAOButton>
                    </Box>
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
            {proposal.yesVotes + proposal.noVotes > 0 && (
              <Box width="100%">
                <Box display="flex" justifyContent="space-between" width="100%" pb={2}>
                  <TypographyGreen>Agreed: {proposal.yesVotes}</TypographyGreen>

                  <TypographyBlue>Disagreed: {proposal.noVotes}</TypographyBlue>
                </Box>

                <Box>
                  <LinearChart agreed={proposal.yesVotes} disagreed={proposal.noVotes} />
                </Box>
              </Box>
            )}
            {proposal.yesVotes + proposal.noVotes === 0 && (
              <Box display="flex" alignItems="center" width="100%">
                <PlaylistRemoveIcon />
                <Typography ml={1}>No votes</Typography>
              </Box>
            )}
          </Box>
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

            <Box sx={{ mt: { xs: 4, md: 0 } }}>
              {proposal.yesVotes + proposal.noVotes > 0 && (
                <Box width="100%">
                  <Box display="flex" justifyContent="space-between" width="100%" pb={2}>
                    <TypographyGreen>Agreed: {proposal.yesVotes}</TypographyGreen>

                    <TypographyBlue>Disagreed: {proposal.noVotes}</TypographyBlue>
                  </Box>

                  <Box>
                    <LinearChart agreed={proposal.yesVotes} disagreed={proposal.noVotes} />
                  </Box>
                </Box>
              )}
              {proposal.yesVotes + proposal.noVotes === 0 && (
                <Box display="flex" alignItems="center" width="100%">
                  <PlaylistRemoveIcon />
                  <Typography ml={1}>No votes</Typography>
                </Box>
              )}
            </Box>
          </>
        )}
      </AccordionDetails>
    </StyledAccordion>
  );
};

export default VoteAccordion;
