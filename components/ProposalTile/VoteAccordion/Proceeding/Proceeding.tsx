/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton';
import DAOButton from 'components/DAOButton/DAOButton';
import DAOTile from 'components/DAOTile/DAOTile';

import useHandleProcessProposal from 'hooks/useHandleProcessProposal';
import useHandleProcessKick from 'hooks/useHandleProcessKick';

import FETCH_STATUSES from 'enums/fetchStatuses';
import PROCESSING_STATUSES from 'enums/processingStatuses';

import { getMetamaskMessageError } from 'utils/blockchain';

import { selectProvider, selectChainId } from 'redux/slices/main';
import { selectIsLoggedIn } from 'redux/slices/user';
import { setOpen, setStatus, setMessage } from 'redux/slices/modalTransaction';

interface ProceedingProps {
  votingPeriodEnds: string;
  gracePeriodEnds: string;
  guildkick: boolean;
  proposalIndex: string;
}

const Proceeding: FC<ProceedingProps> = ({ votingPeriodEnds, gracePeriodEnds, guildkick, proposalIndex }) => {
  const dispatch = useDispatch();

  const provider = useSelector(selectProvider);
  const chainId = useSelector(selectChainId);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [processProposalStatus, setProcessProposalStatus] = useState(FETCH_STATUSES.IDLE);

  const currentTime = new Date().getTime() / 1000;

  const handleProcessProposal = async () => {
    dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
    dispatch(setOpen(true));

    try {
      const receipt = await useHandleProcessProposal(provider, proposalIndex, chainId);

      if (receipt.blockNumber) {
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
      setProcessProposalStatus(FETCH_STATUSES.ERROR);
      dispatch(setStatus(PROCESSING_STATUSES.ERROR));
    }
  };

  const handleProcessKick = async () => {
    dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
    dispatch(setOpen(true));

    try {
      const receipt = await useHandleProcessKick(provider, proposalIndex, chainId);

      if (receipt.blockNumber) {
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
      setProcessProposalStatus(FETCH_STATUSES.ERROR);
      dispatch(setStatus(PROCESSING_STATUSES.ERROR));
    }
  };

  return (
    <Box>
      <Box>
        {currentTime > Number(votingPeriodEnds) && currentTime > Number(gracePeriodEnds) && (
          <>
            {processProposalStatus === FETCH_STATUSES.IDLE && (
              <DAOTile>
                <Typography align="center" p={1}>
                  To finish the whole process, proposal needs to be processed.
                </Typography>
              </DAOTile>
            )}

            {processProposalStatus === FETCH_STATUSES.ERROR && (
              <Box mt={1}>
                <DAOTile variant="errorBox">
                  <Typography align="center" p={1}>
                    Proposal is not ready to be processed by blockchain network or it is been proceeding right now.
                  </Typography>
                </DAOTile>
              </Box>
            )}

            {processProposalStatus === FETCH_STATUSES.SUCCESS && (
              <DAOTile variant="gradientOutline">
                <Typography align="center" p={1}>
                  Proposal is been proceeding.
                </Typography>
              </DAOTile>
            )}

            {!isLoggedIn && (
              <Box maxWidth="200px" mx="auto" mt={2}>
                <ConnectWalletButton />
              </Box>
            )}

            {/* TODO: display button only to proposer or applicant? */}
            {isLoggedIn && processProposalStatus !== FETCH_STATUSES.SUCCESS && guildkick === false && (
              <Box maxWidth="200px" mx="auto" mt={2}>
                <DAOButton variant="gradientOutline" onClick={handleProcessProposal}>
                  Process Proposal
                </DAOButton>
              </Box>
            )}

            {isLoggedIn && processProposalStatus !== FETCH_STATUSES.SUCCESS && guildkick === true && (
              <Box maxWidth="200px" mx="auto" mt={2}>
                <DAOButton variant="gradientOutline" onClick={handleProcessKick}>
                  Process Guild Kick
                </DAOButton>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Proceeding;
