import { FC } from 'react';
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
import { setOpen } from 'redux/slices/modalWireddCKB';

import HomeIcon from '@mui/icons-material/Home';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import CategoryIcon from '@mui/icons-material/Category';
import BallotIcon from '@mui/icons-material/Ballot';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import PollIcon from '@mui/icons-material/Poll';

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

  const handledCKBModal = () => {
    dispatch(setOpen(true));
  };

  const handleClose = () => {
    if (setDrawerOpen) {
      setDrawerOpen(false);
    }
  };

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
    <Box
      display="flex"
      flexDirection="column"
      sx={{ alignItems: { xs: 'center', md: 'flex-start' } }}
      minHeight="60vh"
      style={{
        backgroundColor: 'rgba(255,255,255,1)',
        // backgroundImage: 'linear-gradient(to top left, #d70a84, #51127f)',
        boxShadow: '0 4px 6px -1px #0000001a,0 2px 4px -1px #0000000f',
        height: '70vh',
        width: '14vw',
        borderRadius: '15px',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      {isMobile && (
        <Box display="flex" justifyContent="flex-end" width="100%" mt={2} mr={2}>
          <IconButton aria-label="close drawer" onClick={handleClose}>
            <StyledCloseIcon />
          </IconButton>
        </Box>
      )}
      <Box sx={{ mb: { xs: 1, md: 0.5 } }} mt={2}>
        <Link internal href="/">
          <DAOPlainButton fullWidth focusRipple>
            <Box display="flex" pl={5} pr={5} pt={2} pb={2}>
              <HomeIcon fontSize="medium" style={{ marginRight: '15px' }} />
              <TypographyBlack>Home</TypographyBlack>
            </Box>
          </DAOPlainButton>
        </Link>
      </Box>

      <Box sx={{ mb: { xs: 1, md: 0.5 } }}>
        <DAOPlainButton onClick={() => handleClick(1)}>
          <Box display="flex" pl={5} pr={5} pt={2} pb={2}>
            <FeaturedPlayListIcon fontSize="medium" style={{ marginRight: '15px' }} />
            <TypographyBlack>Proposals</TypographyBlack>
          </Box>
        </DAOPlainButton>
      </Box>

      <Box sx={{ mb: { xs: 1, md: 0.5 }, pl: { xs: 0, md: 2 } }}>
        <DAOPlainButton onClick={() => handleClick(2)}>
          <Box display="flex" pl={5} pr={5} pt={2} pb={2}>
            <CategoryIcon fontSize="medium" style={{ marginRight: '15px' }} />
            <TypographyBlack>Collecting Funds</TypographyBlack>
          </Box>
        </DAOPlainButton>
      </Box>

      <Box sx={{ mb: { xs: 1, md: 0.5 }, pl: { xs: 0, md: 2 } }}>
        <DAOPlainButton onClick={() => handleClick(3)}>
          <Box display="flex" pl={5} pr={5} pt={2} pb={2}>
            <BallotIcon fontSize="medium" style={{ marginRight: '15px' }} />
            <TypographyBlack>Voting</TypographyBlack>
          </Box>
        </DAOPlainButton>
      </Box>

      <Box sx={{ mb: { xs: 1, md: 0.5 }, pl: { xs: 0, md: 2 } }}>
        <DAOPlainButton onClick={() => handleClick(4)}>
          <Box display="flex" pl={5} pr={5} pt={2} pb={2}>
            <HowToVoteIcon fontSize="medium" style={{ marginRight: '15px' }} />
            <TypographyBlack>Grace Period</TypographyBlack>
          </Box>
        </DAOPlainButton>
      </Box>

      <Box sx={{ mb: { xs: 1, md: 0.5 }, pl: { xs: 0, md: 2 } }}>
        <DAOPlainButton onClick={() => handleClick(5)}>
          <Box display="flex" pl={5} pr={5} pt={2} pb={2}>
            <ScheduleSendIcon fontSize="medium" style={{ marginRight: '15px' }} />
            <TypographyBlack>Proceeding</TypographyBlack>
          </Box>
        </DAOPlainButton>
      </Box>

      <Box sx={{ mb: { xs: 1, md: 0.5 }, pl: { xs: 0, md: 2 } }}>
        <DAOPlainButton onClick={() => handleClick(6)}>
          <Box display="flex" pl={5} pr={5} pt={2} pb={2}>
            <PollIcon fontSize="medium" style={{ marginRight: '15px' }} />
            <TypographyBlack>Finished</TypographyBlack>
          </Box>
        </DAOPlainButton>
      </Box>

      <Box mx="auto" mb={1} mt={5} sx={{ width: { xs: '60%', md: '100%' } }} pl={5} pr={5}>
        <Link internal href={APP_ROUTES.CREATE}>
          <DAOButton variant="gradientOutline">
            <Typography>Create proposal</Typography>
          </DAOButton>
        </Link>
      </Box>

      <Box mx="auto" my={1} sx={{ width: { xs: '60%', md: '100%' } }} pl={5} pr={5}>
        <DAOButton variant="gradientOutline" onClick={handledCKBModal}>
          <Typography>Get dCKB</Typography>
        </DAOButton>
      </Box>

      <Box mx="auto" my={1} sx={{ width: { xs: '60%', md: '100%' } }} pl={5} pr={5}>
        <ThemeModeSwitch />
      </Box>
    </Box>
  );
};

export default MenuContent;
