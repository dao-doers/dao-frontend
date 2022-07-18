import { FC, useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment-mini';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton';
import DAOButton from 'components/DAOButton/DAOButton';
import DAOTile from 'components/DAOTile/DAOTile';
import Counter from 'components/Counter/Counter';

import submitProposalVote, { HANDLE_VOTE_ERRORS } from 'hooks/vote';

import PROCESSING_STATUSES from 'enums/processingStatuses';

import { getMetamaskMessageError } from 'utils/blockchain';

import { selectProvider, selectChainId } from 'redux/slices/main';
import { selectUserAddress, selectIsLoggedIn, selectUserShares } from 'redux/slices/user';
import { setOpen, setStatus, setMessage } from 'redux/slices/modalTransaction';
import { MolochV2 } from 'utils/contracts';

interface VotingProps {
  proposalIndex: string;
  votingPeriodStarts: string;
  votingPeriodEnds: string;
}

const VOTE_YES = 1;
const VOTE_NO = 2;

const Voting: FC<VotingProps> = ({ proposalIndex, votingPeriodStarts, votingPeriodEnds }) => {
  const dispatch = useDispatch();

  const provider = useSelector(selectProvider);
  const chainId = useSelector(selectChainId);
  const userAddress = useSelector(selectUserAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userShares = useSelector(selectUserShares);

  const [currentUserVoted, setCurrentUserVoted] = useState<boolean | null>(null);
  const [voteSuccessMessageVisibility, setVoteSuccessMessageVisibility] = useState(false);
  const votingPeriodStarted = useMemo(() => moment.unix(parseInt(votingPeriodStarts, 10)).isBefore(), [
    votingPeriodStarts,
  ]);

  async function getMemberProposalVote() {
    if (!userAddress || typeof proposalIndex !== 'string' || proposalIndex === '' || !chainId) {
      setCurrentUserVoted(null);
      return;
    }

    const dao = await MolochV2(provider, chainId);

    if (!dao) {
      console.error('useCheckIfVoted::dao is falsy', {
        chainId,
        provider,
      });
      setCurrentUserVoted(null);
      return;
    }

    const voteEnum: number = await dao.getMemberProposalVote(userAddress, proposalIndex);

    if (typeof voteEnum === 'number') {
      setCurrentUserVoted(voteEnum === VOTE_YES || voteEnum === VOTE_NO);
    } else {
      setCurrentUserVoted(null);
    }
  }

  useEffect(() => {
    getMemberProposalVote();
  }, [userAddress, proposalIndex, provider, chainId]);

  const handleVote = async (vote: number) => {
    dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
    dispatch(setOpen(true));

    try {
      const receipt = await submitProposalVote(provider, proposalIndex, vote, chainId);

      if (receipt.blockNumber) {
        setVoteSuccessMessageVisibility(true);
        dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));
        dispatch(
          setMessage(
            `Your request has been processed by blockchain network and will be displayed when the next block is mined. Transaction hash: ${receipt.transactionHash}`,
          ),
        );
        getMemberProposalVote();
      }
    } catch (error: any) {
      if (HANDLE_VOTE_ERRORS.includes(error?.message)) {
        dispatch(setStatus(PROCESSING_STATUSES.ERROR));
        dispatch(setMessage(error.message));
      } else if (error.code) {
        dispatch(setStatus(PROCESSING_STATUSES.ERROR));
        dispatch(setMessage(getMetamaskMessageError(error)));
      } else {
        dispatch(setStatus(PROCESSING_STATUSES.ERROR));
        dispatch(setMessage('Unknown error.'));
      }

      setVoteSuccessMessageVisibility(false);
    }
  };

  if (!votingPeriodStarted) {
    return (
      <Box>
        <b>Voting period has not started yet.</b> It will begin at:{' '}
        {moment.unix(parseInt(votingPeriodStarts, 10)).format()}.<br />
        <br />
      </Box>
    );
  }

  return (
    <Box>
      {!isLoggedIn && (
        <Box maxWidth="200px" mx="auto">
          <ConnectWalletButton />
        </Box>
      )}

      {isLoggedIn &&
        !voteSuccessMessageVisibility &&
        currentUserVoted === false &&
        typeof userShares === 'number' &&
        userShares > 0 && (
          <Box display="flex" justifyContent="space-between">
            <Box width="48%">
              <DAOButton variant="agreeVariant" onClick={() => handleVote(VOTE_YES)}>
                Yes
              </DAOButton>
            </Box>
            <Box width="48%">
              <DAOButton variant="disagreeVariant" onClick={() => handleVote(VOTE_NO)}>
                No
              </DAOButton>
            </Box>
          </Box>
        )}

      {isLoggedIn && !voteSuccessMessageVisibility && currentUserVoted === true && (
        <DAOTile variant="errorBox">
          <Typography align="center" p={1}>
            You have already voted!
          </Typography>
        </DAOTile>
      )}

      {voteSuccessMessageVisibility && (
        <DAOTile variant="gradientOutline">
          <Typography align="center" p={1}>
            You have successfully voted!
          </Typography>
        </DAOTile>
      )}

      <Box display="flex" justifyContent="space-between" width="100%" pb={2} mt={3}>
        <Typography width="100%">Voting Ends In:</Typography>
        <Counter time={Number(votingPeriodEnds)} />
      </Box>
    </Box>
  );
};

export default Voting;
