/* eslint-disable react-hooks/rules-of-hooks */
import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DAOButton from 'components/DAOButton/DAOButton';
import DAOTile from 'components/DAOTile/DAOTile';

import useHandleWithdraw from 'hooks/useHandleWithdraw';

import PROCESSING_STATUSES from 'enums/processingStatuses';

import { getMetamaskMessageError } from 'utils/blockchain';

import { selectProvider } from 'redux/slices/main';
import { selectUserAddress } from 'redux/slices/user';
import { setOpen, setStatus, setMessage } from 'redux/slices/modalTransaction';

interface FinishedProps {
  paymentRequested: string;
  didPass: boolean;
  applicant: string;
}

const Finished: FC<FinishedProps> = ({ paymentRequested, didPass, applicant }) => {
  const dispatch = useDispatch();

  const provider = useSelector(selectProvider);
  const userAddress = useSelector(selectUserAddress);

  const handleWithdraw = async () => {
    dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
    dispatch(setOpen(true));

    try {
      // TODO: must add flag or something after withraw has been done
      const receipt = await useHandleWithdraw(provider, paymentRequested);

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
      dispatch(setStatus(PROCESSING_STATUSES.ERROR));
    }
  };

  return (
    <>
      {didPass === true && (
        <>
          <DAOTile variant="successBox">
            <Typography align="center" p={1}>
              Proposal has been approved.
            </Typography>
          </DAOTile>
          {userAddress === applicant && (
            <Box maxWidth="200px" mx="auto" mt={2}>
              <DAOButton variant="gradientOutline" onClick={handleWithdraw}>
                Withdraw funds
              </DAOButton>
            </Box>
          )}
        </>
      )}
      {didPass === false && (
        <DAOTile variant="errorBox">
          <Typography align="center" p={1}>
            Proposal has been rejected.
          </Typography>
        </DAOTile>
      )}
    </>
  );
};

export default Finished;
