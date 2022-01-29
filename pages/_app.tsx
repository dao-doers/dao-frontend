import type { AppProps } from 'next/app';
import Web3 from 'web3';

import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';

import store from 'redux/store';
import { Provider } from 'react-redux';

import { GlobalThemeProvider } from 'theme';

import createEmotionCache from '../createEmotionCache';

declare global {
  interface Window {
    web3: Web3;
  }
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const cache = createEmotionCache();

  return (
    <CacheProvider value={cache}>
      <Provider store={store}>
        <GlobalThemeProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </GlobalThemeProvider>
      </Provider>
    </CacheProvider>
  );
};

export default MyApp;
