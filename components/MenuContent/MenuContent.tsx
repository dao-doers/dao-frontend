import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Close from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import Link from 'components/Link';
import DAOButton from 'components/DAOButton/DAOButton';
import ThemeModeSwitch from 'components/ThemeModeSwitch/ThemeModeSwitch';
import DAOPlainButton from 'components/DAOPlainButton/DAOPlainButton';

import useIsMobile from 'hooks/useIsMobile';

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

const TypographyBlack = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.main7};
  font-weight: 600;
`;

const StyledCloseIcon = styled(Close)`
  color: ${({ theme }) => theme.palette.text.primary};
`;

const MenuContent: FC<MenuContentProps> = ({ setDrawerOpen }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isMobile = useIsMobile('md');

  const handleClose = () => {
    if (setDrawerOpen) {
      setDrawerOpen(false);
    }
  };

  const [open, setOpen] = useState(false);

  const handleClick = (value: number) => {
    if (router.pathname !== '/proposals') {
      router.push('/proposals');
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
    <Box display="flex" flexDirection="column" sx={{ alignItems: { xs: 'center', md: 'flex-start' } }} minHeight="80vh">
      {isMobile && (
        <Box display="flex" justifyContent="flex-end" width="100%" mt={2} mr={2}>
          <IconButton aria-label="close drawer" onClick={handleClose}>
            <StyledCloseIcon />
          </IconButton>
        </Box>
      )}
      <Box sx={{ mb: { xs: 1, md: 2 } }} mt={2}>
        <Link internal href="/">
          <TypographyBlack>Home</TypographyBlack>
        </Link>
      </Box>

      <Box sx={{ mb: { xs: 1, md: 0.5 } }}>
        <DAOPlainButton onClick={() => handleClick(1)}>
          <TypographyBlack>Proposals</TypographyBlack>
        </DAOPlainButton>
      </Box>

      <Box sx={{ mb: { xs: 1, md: 0.5 }, pl: { xs: 0, md: 2 } }}>
        <DAOPlainButton onClick={() => handleClick(2)}>
          <TypographyBlack>Collecting Funds</TypographyBlack>
        </DAOPlainButton>
      </Box>

      <Box sx={{ mb: { xs: 1, md: 0.5 }, pl: { xs: 0, md: 2 } }}>
        <DAOPlainButton onClick={() => handleClick(3)}>
          <TypographyBlack>Voting</TypographyBlack>
        </DAOPlainButton>
      </Box>

      <Box sx={{ mb: { xs: 1, md: 0.5 }, pl: { xs: 0, md: 2 } }}>
        <DAOPlainButton onClick={() => handleClick(4)}>
          <TypographyBlack>Grace Period</TypographyBlack>
        </DAOPlainButton>
      </Box>

      <Box sx={{ mb: { xs: 1, md: 0.5 }, pl: { xs: 0, md: 2 } }}>
        <DAOPlainButton onClick={() => handleClick(5)}>
          <TypographyBlack>Proceeding</TypographyBlack>
        </DAOPlainButton>
      </Box>

      <Box sx={{ mb: { xs: 1, md: 0.5 }, pl: { xs: 0, md: 2 } }}>
        <DAOPlainButton onClick={() => handleClick(6)}>
          <TypographyBlack>Finished</TypographyBlack>
        </DAOPlainButton>
      </Box>

      <Box mx="auto" mb={1} mt={5} sx={{ width: { xs: '60%', md: '100%' } }}>
        <Link internal href={APP_ROUTES.CREATE}>
          <DAOButton variant="gradientOutline">
            <Typography>Create proposal</Typography>
          </DAOButton>
        </Link>
      </Box>

      <Box mx="auto" my={1} sx={{ width: { xs: '60%', md: '100%' } }}>
        <DAOButton variant="gradientOutline" onClick={() => setOpen(true)}>
          <Typography>Wire testnet dCKB</Typography>
        </DAOButton>
        <WireTestnetModal isModalOpen={open} isModalClose={() => setOpen(false)} />
      </Box>

      <Box mx="auto" my={1} sx={{ width: { xs: '60%', md: '100%' } }}>
        <ThemeModeSwitch />
      </Box>
    </Box>
  );
};

export default MenuContent;
