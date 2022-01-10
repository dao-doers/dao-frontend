import type { AppProps } from 'next/app';

import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';

import store from 'redux/store';
import { Provider } from 'react-redux';

import ModalsContainer from 'components/ModalsContainer/ModalsContainer';

import { GlobalThemeProvider } from 'theme';

import createEmotionCache from '../createEmotionCache';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const cache = createEmotionCache();

  return (
    <CacheProvider value={cache}>
      <Provider store={store}>
        <GlobalThemeProvider>
          <CssBaseline />
          <Component {...pageProps} />
          <ModalsContainer />
        </GlobalThemeProvider>
      </Provider>
    </CacheProvider>
  );
};

export default MyApp;
