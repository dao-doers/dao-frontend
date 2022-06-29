/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment-mini';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton';
import DAOButton from 'components/DAOButton/DAOButton';
import DAOTile from 'components/DAOTile/DAOTile';
import Counter from 'components/Counter/Counter';

import useHandleVote, { HANDLE_VOTE_ERRORS } from 'hooks/useHandleVote';
import useCheckIfVoted from 'hooks/useCheckIfVoted';

import PROCESSING_STATUSES from 'enums/processingStatuses';

import { getMetamaskMessageError } from 'utils/blockchain';

import { selectProvider, selectChainId } from 'redux/slices/main';
import { selectUserAddress, selectIsLoggedIn, selectUserShares } from 'redux/slices/user';
import { setOpen, setStatus, setMessage } from 'redux/slices/modalTransaction';

interface VotingProps {
  proposalIndex: string;
  votingPeriodStarts: string;
  votingPeriodEnds: string;
}

const Voting: FC<VotingProps> = ({ proposalIndex, votingPeriodStarts, votingPeriodEnds }) => {
  const dispatch = useDispatch();

  const provider = useSelector(selectProvider);
  const chainId = useSelector(selectChainId);
  const userAddress = useSelector(selectUserAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userShares = useSelector(selectUserShares);

  // 0 means idle state, 1 means user can vote, 2 means user already voted, 3 means user just voted
  const [notVotedYet, setNotVotedYet] = useState(0);

  const votingPeriodStarted = useMemo(() => moment.unix(parseInt(votingPeriodStarts, 10)).isBefore(), [
    votingPeriodStarts,
  ]);

  useEffect(() => {
    if (isLoggedIn && userShares > 0 && proposalIndex !== null) {
      useCheckIfVoted(provider, userAddress, proposalIndex, chainId).then(async response => {
        if (response === true) {
          setNotVotedYet(1);
        } else {
          setNotVotedYet(2);
        }
      });
    }
    // TODO: remove that DAO_ADDRESS env
  }, [userAddress, isLoggedIn, proposalIndex, process.env.DAO_ADDRESS]);

  const handleVote = async (vote: number) => {
    dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
    dispatch(setOpen(true));

    await useCheckIfVoted(provider, userAddress, proposalIndex, chainId).then(async response => {
      if (response === true) {
        setNotVotedYet(1);

        try {
          const receipt = await useHandleVote(provider, proposalIndex, vote, chainId);

          if (receipt.blockNumber) {
            setNotVotedYet(3);
            dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));
            dispatch(
              setMessage(
                `Your request has been processed by blockchain network and will be displayed with the block number ${
                  receipt.blockNumber + 1
                }`,
              ),
            );
          }
        } catch (error: any) {
          if (HANDLE_VOTE_ERRORS.includes(error?.message)) {
            dispatch(setStatus(PROCESSING_STATUSES.ERROR));
            dispatch(setMessage(error.message));
          } else if (error.code) {
            dispatch(setStatus(PROCESSING_STATUSES.ERROR));
            dispatch(setMessage(getMetamaskMessageError(error)));
          }
        }
      } else {
        setNotVotedYet(2);
        dispatch(setMessage('You have already voted!'));
        dispatch(setStatus(PROCESSING_STATUSES.ERROR));
      }
    });
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

      {isLoggedIn && notVotedYet < 2 && userShares > 0 && (
        <Box display="flex" justifyContent="space-between">
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
        <DAOTile variant="errorBox">
          <Typography align="center" p={1}>
            You have already voted!
          </Typography>
        </DAOTile>
      )}

      {notVotedYet === 3 && (
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
