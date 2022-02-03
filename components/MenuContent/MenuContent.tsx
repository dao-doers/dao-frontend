import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Link from 'components/Link';
import DAOButton from 'components/DAOButton/DAOButton';
import ThemeModeSwitch from 'components/ThemeModeSwitch/ThemeModeSwitch';
import DAOPlainButton from 'components/DAOPlainButton/DAOPlainButton';

import { APP_ROUTES } from 'utils/routes';

import {
  setCollectingFundsProposals,
  setVotingProposals,
  setGracePeriodProposals,
  setProceedingProposals,
  setFinishedProposals,
  clearSorted,
} from 'redux/slices/proposals';

const MenuContent: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDisplayAll = () => {
    if (router.pathname !== '/') {
      router.push('/');
    }
    dispatch(clearSorted());
  };

  const handleSortCollectingFunds = () => {
    if (router.pathname !== '/') {
      router.push('/');
    }
    dispatch(setCollectingFundsProposals());
  };

  const handleSortVoting = () => {
    if (router.pathname !== '/') {
      router.push('/');
    }
    dispatch(setVotingProposals());
  };

  const handleSortGracePeriod = () => {
    if (router.pathname !== '/') {
      router.push('/');
    }
    dispatch(setGracePeriodProposals());
  };

  const handleSortProceeding = () => {
    if (router.pathname !== '/') {
      router.push('/');
    }
    dispatch(setProceedingProposals());
  };

  const handleSortFinished = () => {
    if (router.pathname !== '/') {
      router.push('/');
    }
    dispatch(setFinishedProposals());
  };

  return (
    <Box>
      <Box sx={{ py: { xs: 2, md: 0.5 } }} mt={2}>
        <DAOPlainButton onClick={handleDisplayAll}>All Proposals</DAOPlainButton>
      </Box>

      <Box sx={{ py: { xs: 2, md: 0.5 } }}>
        <DAOPlainButton onClick={handleSortCollectingFunds}>Collecting Funds</DAOPlainButton>
      </Box>

      <Box sx={{ py: { xs: 2, md: 0.5 } }}>
        <DAOPlainButton onClick={handleSortVoting}>Voting</DAOPlainButton>
      </Box>

      <Box sx={{ py: { xs: 2, md: 0.5 } }}>
        <DAOPlainButton onClick={handleSortGracePeriod}>Grace Period</DAOPlainButton>
      </Box>

      <Box sx={{ py: { xs: 2, md: 0.5 } }}>
        <DAOPlainButton onClick={handleSortProceeding}>Proceeding</DAOPlainButton>
      </Box>

      <Box sx={{ py: { xs: 2, md: 0.5 } }}>
        <DAOPlainButton onClick={handleSortFinished}>Finished</DAOPlainButton>
      </Box>

      <Box mx="auto" my={4} sx={{ width: { xs: '60%', md: '100%' } }}>
        <Link internal href={APP_ROUTES.CREATE}>
          <DAOButton variant="gradientOutline">
            <Typography>Make a proposal</Typography>
          </DAOButton>
        </Link>
      </Box>

      <Box mx="auto" my={4} sx={{ width: { xs: '60%', md: '100%' } }}>
        <ThemeModeSwitch />
      </Box>
    </Box>
  );
};

export default MenuContent;
