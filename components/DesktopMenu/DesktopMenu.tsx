import { FC } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Link from 'components/Link';
import DAOButton from 'components/DAOButton/DAOButton';
import ThemeModeSwitch from 'components/ThemeModeSwitch/ThemeModeSwitch';

import { APP_ROUTES } from 'utils/routes';

import { selectTheme } from 'redux/slices/theme';

import THEME_MODES from 'enums/themeModes';

const MainBox = styled(Box)`
  width: 15vw;
  height: 100%;
  padding-right: 30px;
`;

const DesktopMenu: FC = () => {
  const themeMode = useSelector(selectTheme);

  return (
    <MainBox>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
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
          <Typography variant="subtitle2" paragraph>
            All Proposals
          </Typography>
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
