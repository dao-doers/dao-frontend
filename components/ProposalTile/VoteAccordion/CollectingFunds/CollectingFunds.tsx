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

import { selectProvider, selectChainId } from 'redux/slices/main';
import { selectUserAddress, selectIsLoggedIn, selectUserShares } from 'redux/slices/user';
import { setOpen, setStatus, setMessage } from 'redux/slices/modalTransaction';
import { selectProposalDeposit } from 'redux/slices/dao';
import { shannonsToDisplayValue } from 'utils/units';

interface CollectingFundsProps {
  proposalId: string;
}

const CollectingFunds: FC<CollectingFundsProps> = ({ proposalId }) => {
  const dispatch = useDispatch();

  const provider = useSelector(selectProvider);
  const chainId = useSelector(selectChainId);
  const userAddress = useSelector(selectUserAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userShares = useSelector(selectUserShares);
  const proposalDeposit = useSelector(selectProposalDeposit);

  const [sponsorProposalStatus, setSponsorProposalStatus] = useState(PROCESSING_STATUSES.IDLE);

  const handleSponsorProposal = async () => {
    try {
      if (!proposalDeposit) {
        throw new Error('proposalDeposit from indexer undefined');
      }

      dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
      dispatch(setOpen(true));

      const receipt = await useHandleSponsorProposal(provider, proposalId, userAddress, chainId, proposalDeposit);
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

  return (
    <Box>
      {sponsorProposalStatus !== PROCESSING_STATUSES.SUCCESS && (
        <DAOTile>
          <Typography align="center" p={1}>
            This proposal has not been sponsored yet. It can be sponsored only by DAO member.
            <br />
            Amount required to sponsor: {proposalDeposit ? shannonsToDisplayValue(proposalDeposit) : ' - '} dCKB.
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

export default CollectingFunds;
