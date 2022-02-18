import { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';

import { selectTheme, toggleTheme } from 'redux/slices/theme';

import THEME_MODES from 'enums/themeModes';

const StyledBox = styled(Box)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.colors.main4};
  border-radius: 10px;
  display: flex;
  cursor: pointer;
`;

const GreyBox = styled(Box)`
  width: 50%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ColoredBox = styled(Box)`
  width: 50%;
  height: 100%;
  padding: 2px;
  border-radius: 10px;
  background: ${({ theme }) => theme.palette.colors.main4};
`;

const InnerColoredBox = styled(Box)`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.background.default};
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ThemeModeSwitch: FC = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector(selectTheme);

  const handleThemeModeChange = useCallback(() => dispatch(toggleTheme()), [dispatch]);

  return (
    <StyledBox onClick={handleThemeModeChange}>
      {themeMode === THEME_MODES.DARK ? (
        <>
          <GreyBox>
            <LightModeIcon />
          </GreyBox>
          <ColoredBox>
            <InnerColoredBox>
              <ModeNightIcon />
            </InnerColoredBox>
          </ColoredBox>
        </>
      ) : (
        <>
          <ColoredBox>
            <InnerColoredBox>
              <LightModeIcon />
            </InnerColoredBox>
          </ColoredBox>
          <GreyBox>
            <ModeNightIcon />
          </GreyBox>
        </>
      )}
    </StyledBox>
  );
};

export default ThemeModeSwitch;
