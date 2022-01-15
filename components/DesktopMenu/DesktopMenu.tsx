import { FC } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Link from 'components/Link';
import DAOButton from 'components/DAOButton/DAOButton';
import ThemeModeSwitch from 'components/ThemeModeSwitch/ThemeModeSwitch';
import DAOPlainButton from 'components/DAOPlainButton/DAOPlainButton';

import { APP_ROUTES } from 'utils/routes';

import { selectTheme } from 'redux/slices/theme';
import {
  setCollectingFundsProposals,
  setVotingProposals,
  setGracePeriodProposals,
  setProceedingProposals,
  clearSorted,
} from 'redux/slices/proposals';

import THEME_MODES from 'enums/themeModes';

const MainBox = styled(Box)`
  width: 15vw;
  height: 100%;
  padding-right: 30px;
`;

const DesktopMenu: FC = () => {
  const dispatch = useDispatch();

  const themeMode = useSelector(selectTheme);

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
    <MainBox>
      <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'sticky', top: '24px' }}>
        <Box minWidth="160px" width="20%" my={3}>
          <Link internal href="/">
            {themeMode === THEME_MODES.DARK ? (
              <Image src="/logos/logo_white.png" alt="header-logo" height="110" width="219" />
            ) : (
              <Image src="/logos/logo_black.png" alt="header-logo" height="110" width="219" />
            )}
          </Link>
        </Box>

        <Link internal href="/">
          <DAOPlainButton onClick={handleDisplayAll}>All Proposals</DAOPlainButton>
        </Link>

        <Link internal href="/">
          <DAOPlainButton onClick={handleSortCollectingFunds}>Collecting Funds</DAOPlainButton>
        </Link>

        <Link internal href="/">
          <DAOPlainButton onClick={handleSortVoting}>Voting</DAOPlainButton>
        </Link>

        <Link internal href="/">
          <DAOPlainButton onClick={handleSortGracePeriod}>Grace Period</DAOPlainButton>
        </Link>

        <Link internal href="/">
          <DAOPlainButton onClick={handleSortProceeding}>Proceeding</DAOPlainButton>
        </Link>

        <Box my={8}>
          <Link internal href={APP_ROUTES.NEW}>
            <DAOButton variant="gradientOutline">
              <Typography>Make a proposal</Typography>
            </DAOButton>
          </Link>
        </Box>

        <ThemeModeSwitch />
      </Box>
    </MainBox>
  );
};

export default DesktopMenu;
