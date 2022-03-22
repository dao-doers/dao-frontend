import Image from 'next/image';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';

import Link from 'components/Link/Link';
import MenuContent from 'components/MenuContent/MenuContent';

import THEME_MODES from 'enums/themeModes';

import { selectTheme } from 'redux/slices/theme';

const MainBox = styled(Box)`
  width: 15vw;
  height: 100%;
  padding-right: 30px;
`;

const DesktopMenu: FC = () => {
  const themeMode = useSelector(selectTheme);

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

        <MenuContent />
      </Box>
    </MainBox>
  );
};

export default DesktopMenu;
