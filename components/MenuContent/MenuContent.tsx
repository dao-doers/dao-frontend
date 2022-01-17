import { FC } from 'react';
import { useDispatch } from 'react-redux';

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
  clearSorted,
} from 'redux/slices/proposals';

const MenuContent: FC = () => {
  const dispatch = useDispatch();

  const handleDisplayAll = () => {
    dispatch(clearSorted());
  };

  const handleSortCollectingFunds = () => {
    dispatch(setCollectingFundsProposals());
  };

  const handleSortVoting = () => {
    dispatch(setVotingProposals());
  };

  const handleSortGracePeriod = () => {
    dispatch(setGracePeriodProposals());
  };

  const handleSortProceeding = () => {
    dispatch(setProceedingProposals());
  };

  return (
    <Box>
      <Box sx={{ py: { xs: 2, md: 0.5 } }} mt={2}>
        <Link internal href="/">
          <DAOPlainButton onClick={handleDisplayAll}>All Proposals</DAOPlainButton>
        </Link>
      </Box>

      <Box sx={{ py: { xs: 2, md: 0.5 } }}>
        <Link internal href="/">
          <DAOPlainButton onClick={handleSortCollectingFunds}>Collecting Funds</DAOPlainButton>
        </Link>
      </Box>

      <Box sx={{ py: { xs: 2, md: 0.5 } }}>
        <Link internal href="/">
          <DAOPlainButton onClick={handleSortVoting}>Voting</DAOPlainButton>
        </Link>
      </Box>

      <Box sx={{ py: { xs: 2, md: 0.5 } }}>
        <Link internal href="/">
          <DAOPlainButton onClick={handleSortGracePeriod}>Grace Period</DAOPlainButton>
        </Link>
      </Box>

      <Box sx={{ py: { xs: 2, md: 0.5 } }}>
        <Link internal href="/">
          <DAOPlainButton onClick={handleSortProceeding}>Proceeding</DAOPlainButton>
        </Link>
      </Box>

      <Box mx="auto" my={4} sx={{ width: { xs: '60%', md: '100%' } }}>
        <Link internal href={APP_ROUTES.NEW}>
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
