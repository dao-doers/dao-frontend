import { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton';
import DAOButton from 'components/DAOButton/DAOButton';
import DAOTile from 'components/DAOTile/DAOTile';

import sendSponsorProposalTx from 'hooks/useHandleSponsorProposal';

import PROCESSING_STATUSES from 'enums/processingStatuses';

import { getMetamaskMessageError } from 'utils/blockchain';

import { selectProvider, selectChainId } from 'redux/slices/main';
import { selectUserAddress, selectIsLoggedIn, selectUserShares } from 'redux/slices/user';
import { setOpen, setStatus, setMessage } from 'redux/slices/modalTransaction';
import { selectProcessingReward, selectProposalDeposit } from 'redux/slices/dao';
import { tributeTokenToDisplayValue } from 'utils/units';
import { Proposal } from 'types/types';
import { DCKBToken, MolochV2 } from 'utils/contracts';
import MolochV2JSON from 'lib/MolochV2.json';
import { ethers } from 'ethers';

interface CollectingFundsProps {
  proposal: Proposal;
}

const CollectingFunds: FC<CollectingFundsProps> = ({ proposal }) => {
  const dispatch = useDispatch();

  const provider = useSelector(selectProvider);
  const chainId = useSelector(selectChainId);
  const userAddress = useSelector(selectUserAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userShares = useSelector(selectUserShares);
  const processingReward = useSelector(selectProcessingReward);
  const proposalDeposit = useSelector(selectProposalDeposit);

  const [sponsorProposalStatus, setSponsorProposalStatus] = useState(PROCESSING_STATUSES.IDLE);
  const showSponsorProposalButton =
    isLoggedIn &&
    sponsorProposalStatus !== PROCESSING_STATUSES.SUCCESS &&
    typeof userShares === 'number' &&
    userShares > 0;
  const showCancelProposalButton =
    isLoggedIn && userAddress === proposal.proposer && !proposal.cancelled && !proposal.sponsored;

  const handleSponsorProposal = async () => {
    try {
      if (!proposalDeposit) {
        throw new Error('proposalDeposit from indexer undefined');
      }

      dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
      dispatch(setOpen(true));

      const receipt = await sendSponsorProposalTx(provider, proposal.proposalId, userAddress, chainId, proposalDeposit);
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
      console.log(error);
      dispatch(setStatus(PROCESSING_STATUSES.ERROR));
      if (error.code) {
        dispatch(setMessage(getMetamaskMessageError(error)));
      }
      setSponsorProposalStatus(PROCESSING_STATUSES.ERROR);
    }
  };

  const cancelProposal = async () => {
    try {
      dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
      dispatch(setOpen(true));

      const signer = provider.getSigner();
      const dao = await MolochV2(signer, chainId);
      const tx = await (dao as ethers.Contract).cancelProposal(proposal.proposalId);
      const receipt = await tx.wait();

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
      console.log(error);
      dispatch(setStatus(PROCESSING_STATUSES.ERROR));
      if (error.code) {
        dispatch(setMessage(getMetamaskMessageError(error)));
      }
    }
  };

  return (
    <Box>
      {sponsorProposalStatus !== PROCESSING_STATUSES.SUCCESS && (
        <DAOTile>
          <Typography align="center" p={1}>
            This proposal has not been sponsored yet. It can be sponsored only by DAO member.
            <br />
            Amount required to sponsor: {proposalDeposit ? tributeTokenToDisplayValue(proposalDeposit) : ' - '} pCKB.
            <br />
            It will be returned to sponsor except processing reward (
            {processingReward ? tributeTokenToDisplayValue(processingReward) : ' - '} pCKB).
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
      {showSponsorProposalButton && (
        <Box maxWidth="200px" mx="auto" mt={2}>
          <DAOButton variant="gradientOutline" onClick={handleSponsorProposal}>
            Sponsor Proposal
          </DAOButton>
        </Box>
      )}
      {showCancelProposalButton && (
        <Box maxWidth="200px" mx="auto" mt={2}>
          <DAOButton variant="gradientOutline" onClick={cancelProposal}>
            Cancel Proposal
          </DAOButton>
        </Box>
      )}
    </Box>
  );
};

export default CollectingFunds;
