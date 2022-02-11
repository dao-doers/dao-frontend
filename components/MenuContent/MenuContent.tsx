import { FC, useState } from 'react';
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
import WireTestnetModal from 'modals/WireTestnetModal/WireTestnetModal';

interface MenuContentProps {
  setDrawerOpen?: (arg0: false) => void;
}

const MenuContent: FC<MenuContentProps> = ({ setDrawerOpen }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleClick = (value: number) => {
    if (router.pathname !== '/') {
      router.push('/');
    }
    if (setDrawerOpen) {
      setDrawerOpen(false);
    }

    switch (value) {
      case 1:
        dispatch(clearSorted());
        break;
      case 2:
        dispatch(setCollectingFundsProposals());
        break;
      case 3:
        dispatch(setVotingProposals());
        break;
      case 4:
        dispatch(setGracePeriodProposals());
        break;
      case 5:
        dispatch(setProceedingProposals());
        break;
      case 6:
        dispatch(setFinishedProposals());
        break;
      default:
        dispatch(clearSorted());
    }
  };

  return (
    <Box>
      <Box sx={{ py: { xs: 2, md: 0.5 } }} mt={2}>
        <DAOPlainButton onClick={() => handleClick(1)}>All Proposals</DAOPlainButton>
      </Box>

      <Box sx={{ py: { xs: 2, md: 0.5 } }}>
        <DAOPlainButton onClick={() => handleClick(2)}>Collecting Funds</DAOPlainButton>
      </Box>

      <Box sx={{ py: { xs: 2, md: 0.5 } }}>
        <DAOPlainButton onClick={() => handleClick(3)}>Voting</DAOPlainButton>
      </Box>

      <Box sx={{ py: { xs: 2, md: 0.5 } }}>
        <DAOPlainButton onClick={() => handleClick(4)}>Grace Period</DAOPlainButton>
      </Box>

      <Box sx={{ py: { xs: 2, md: 0.5 } }}>
        <DAOPlainButton onClick={() => handleClick(5)}>Proceeding</DAOPlainButton>
      </Box>

      <Box sx={{ py: { xs: 2, md: 0.5 } }}>
        <DAOPlainButton onClick={() => handleClick(6)}>Finished</DAOPlainButton>
      </Box>

      <Box mx="auto" my={4} sx={{ width: { xs: '60%', md: '100%' } }}>
        <Link internal href={APP_ROUTES.CREATE}>
          <DAOButton variant="gradientOutline">
            <Typography>Make a proposal</Typography>
          </DAOButton>
        </Link>
      </Box>

      <Box mx="auto" my={4} sx={{ width: { xs: '60%', md: '100%' } }}>
        <DAOButton variant="gradientOutline" onClick={() => setOpen(true)}>
          <Typography>Wire testnet dCKB</Typography>
        </DAOButton>
        <WireTestnetModal isModalOpen={open} isModalClose={() => setOpen(false)} />
      </Box>

      <Box mx="auto" my={4} sx={{ width: { xs: '60%', md: '100%' } }}>
        <ThemeModeSwitch />
      </Box>
    </Box>
  );
};

export default MenuContent;
