/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton';
import DAOButton from 'components/DAOButton/DAOButton';
import DAOTile from 'components/DAOTile/DAOTile';

import useHandleSponsorProposal from 'hooks/useHandleSponsorProposal';

import PROCESSING_STATUSES from 'enums/processingStatuses';

import { getMetamaskMessageError } from 'utils/blockchain';

import { selectProvider } from 'redux/slices/main';
import { selectIsLoggedIn, selectUserShares } from 'redux/slices/user';
import { setOpen, setStatus, setMessage } from 'redux/slices/modalTransaction';

interface SponsorPhaseProps {
  proposalId: string;
}

const SponsorPhase: FC<SponsorPhaseProps> = ({ proposalId }) => {
  const dispatch = useDispatch();

  const provider = useSelector(selectProvider);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userShares = useSelector(selectUserShares);

  const [sponsorProposalStatus, setSponsorProposalStatus] = useState(PROCESSING_STATUSES.IDLE);

  const handleSponsorProposal = async () => {
    try {
      dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
      dispatch(setOpen(true));

      const receipt = await useHandleSponsorProposal(provider, proposalId);
      if (receipt.blockNumber) {
        dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));
        dispatch(
          setMessage(
            `Your request has been processed by blockchain network and will be displayed with the block number ${
              receipt.blockNumber + 1
            }`,
          ),
        );
        setSponsorProposalStatus(PROCESSING_STATUSES.SUCCESS);
      }
    } catch (error: any) {
      dispatch(setStatus(PROCESSING_STATUSES.ERROR));
      if (error.code) {
        dispatch(setMessage(getMetamaskMessageError(error)));
      }
      setSponsorProposalStatus(PROCESSING_STATUSES.ERROR);
    }
  };

  return (
    <Box>
      {sponsorProposalStatus !== PROCESSING_STATUSES.SUCCESS && (
        <DAOTile>
          <Typography align="center" p={1}>
            This proposal has not been sponsored yet. It can be sponsored only by DAO member.
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
      {isLoggedIn && sponsorProposalStatus !== PROCESSING_STATUSES.SUCCESS && userShares > 0 && (
        <Box maxWidth="200px" mx="auto" mt={2}>
          <DAOButton variant="gradientOutline" onClick={handleSponsorProposal}>
            Sponsor Proposal
          </DAOButton>
        </Box>
      )}
    </Box>
  );
};

export default SponsorPhase;
