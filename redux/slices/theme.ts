import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import THEME_MODES from 'enums/themeModes';

interface ThemeSlice {
  mode: THEME_MODES;
}

interface StateProps {
  theme: ThemeSlice;
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: THEME_MODES.LIGHT,
  },
  reducers: {
    toggleTheme: state => {
      state.mode = state.mode === THEME_MODES.DARK ? THEME_MODES.LIGHT : THEME_MODES.DARK;
      sessionStorage.setItem('dao-theme', state.mode === THEME_MODES.LIGHT ? THEME_MODES.LIGHT : THEME_MODES.DARK);
    },
    setTheme: (state, action: PayloadAction<THEME_MODES>) => {
      state.mode = action.payload;
    },
  },
});

export const selectTheme = (state: StateProps) => state.theme.mode;

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
