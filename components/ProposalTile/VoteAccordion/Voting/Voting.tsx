/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton';
import DAOButton from 'components/DAOButton/DAOButton';
import DAOTile from 'components/DAOTile/DAOTile';
import Counter from 'components/Counter/Counter';

import useHandleVote from 'hooks/useHandleVote';
import useCheckIfVoted from 'hooks/useCheckIfVoted';

import FETCH_STATUSES from 'enums/fetchStatuses';
import PROCESSING_STATUSES from 'enums/processingStatuses';

import { getMetamaskMessageError } from 'utils/blockchain';

import { selectProvider } from 'redux/slices/main';
import { selectUserAddress, selectIsLoggedIn, selectUserShares } from 'redux/slices/user';
import { setOpen, setStatus, setMessage } from 'redux/slices/modalTransaction';

interface VotingProps {
  proposalIndex: string;
  votingPeriodEnds: string;
}

const Voting: FC<VotingProps> = ({ proposalIndex, votingPeriodEnds }) => {
  const dispatch = useDispatch();

  const provider = useSelector(selectProvider);
  const userAddress = useSelector(selectUserAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userShares = useSelector(selectUserShares);

  // 0 means idle state, 1 means user can vote, 2 means user already voted, 3 means user just voted
  const [notVotedYet, setNotVotedYet] = useState(0);

  useEffect(() => {
    if (isLoggedIn && userShares > 0 && proposalIndex !== null) {
      useCheckIfVoted(provider, userAddress, proposalIndex, process.env.DAO_ADDRESS as any).then(async response => {
        if (response === true) {
          setNotVotedYet(1);
        } else {
          setNotVotedYet(2);
        }
      });
    }
  }, [userAddress, isLoggedIn, proposalIndex, process.env.DAO_ADDRESS]);

  const handleVote = async (vote: number) => {
    dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
    dispatch(setOpen(true));

    await useCheckIfVoted(provider, userAddress, proposalIndex, process.env.DAO_ADDRESS as any).then(async response => {
      if (response === true) {
        setNotVotedYet(1);

        try {
          const receipt = await useHandleVote(provider, proposalIndex, vote);

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
          if (error.code) {
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
